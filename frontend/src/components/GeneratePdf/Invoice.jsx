import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useRef } from 'react'
import Modal from 'react-responsive-modal';

const Invoice = ({ data, userList, openModal, setOpenModal, selectedOrder }) => {
    const order = data?.find((o) => o._id === selectedOrder) || null;

    const printRef = useRef(null);
    const user = order ? userList?.find((u) => u._id === order.userId) : null;
    const handleDownloadPdf = async () => {
        const element = printRef.current;
        if (!element) {
            return;
        }

        const clonedElement = element.cloneNode(true);
        const style = document.createElement('style');
        style.textContent = `
        * {
            color: rgb(0, 0, 0) !important;
            background-color: rgb(255, 255, 255) !important;
            border-color: rgb(229, 231, 235) !important;
        }
        .bg-gray-100 {
            background-color: rgb(243, 244, 246) !important;
        }
        .text-gray-800 {
            color: rgb(31, 41, 55) !important;
        }
        .text-gray-600 {
            color: rgb(75, 85, 99) !important;
        }
        .text-gray-700 {
            color: rgb(55, 65, 81) !important;
        }
    `;
        clonedElement.appendChild(style);

        clonedElement.style.position = 'absolute';
        clonedElement.style.left = '-9999px';
        document.body.appendChild(clonedElement);

        const canvas = await html2canvas(clonedElement, {
            scale: 3,
            backgroundColor: '#ffffff',
        });

        // Remove cloned element
        document.body.removeChild(clonedElement);

        const data = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: "a4",
        });

        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`HoaDon${user.userName}.pdf`);
    }
    if (!selectedOrder || !order) {
        return <div>Chưa chọn đơn hàng</div>;
    }

    return (
        <Modal open={openModal} onClose={() => setOpenModal(false)} center>
            <div className="w-[700px] mx-auto mt-4">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-[700px]">
                    <div ref={printRef} className="p-8 bg-white border border-gray-200">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800 mb-3">Hóa đơn</h1>
                                <p className="text-sm text-gray-600">{order._id}</p>
                            </div>
                            <div className="text-right">
                                <h2 className="font-semibold mb-1">Movie Web</h2>
                                <p className="text-sm text-gray-600">
                                    Nhổn
                                    <br />
                                    Hà Nội, Việt Nam 2025
                                </p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4">Bill To:</h3>
                            <p className="text-gray-700">
                                Khách hàng : {user.userName}
                                <br />
                                Thời gian : {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                            </p>
                        </div>

                        <table className="w-full mb-8 border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border p-2 text-left">Tên gói</th>
                                    <th className="border p-2 text-right">Số lượng</th>
                                    <th className="border p-2 text-right">Giá</th>
                                    <th className="border p-2 text-right">Tổng</th>
                                    <th className="border p-2 text-right">Thanh toán</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-2"> Premium {order.months} tháng</td>
                                    <td className="border p-2 text-right">1</td>
                                    <td className="border p-2 text-right">{order.price.toLocaleString("vi-VN")} VNĐ</td>
                                    <td className="border p-2 text-right">{order.price.toLocaleString("vi-VN")} VNĐ</td>
                                    {order.payment ? (
                                        <td className="border p-2 text-right">Đã thanh toán</td>
                                    ) : (
                                        <td className="border p-2 text-right">Chưa thanh toán</td>
                                    )}
                                </tr>
                            </tbody>
                        </table>

                        <div className="flex justify-end">
                            <div className="w-64">
                                <div className="flex justify-between mb-2">
                                    <span>Giá gói:</span>
                                    <span>{order.price.toLocaleString("vi-VN")} VNĐ</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Tax:</span>
                                    <span>Không</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total:</span>
                                    <span>{order.price.toLocaleString("vi-VN")} VNĐ</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={handleDownloadPdf}
                            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                        >
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default Invoice
