import React from 'react'
import Modal from 'react-responsive-modal'
import ExcelJS from 'exceljs';
const UserExcel = ({ data, openModalPdf, setOpenModalPdf }) => {
    const exportExcelFile = () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("My Sheet");
        sheet.properties.defaultRowHeight = 50;

        sheet.columns = [
            {
                header: "Tên người dùng",
                key: 'userName',
                width: 25
            },
            {
                header: "Email",
                key: 'email',
                width: 25
            },
            {
                header: "Role",
                key: 'role',
                width: 10
            },
            {
                header: "Ngày tạo",
                key: 'createdAt',
                width: 20
            },
        ];

        data?.forEach((user) => {
            sheet.addRow({
                userName: user?.userName,
                email: user?.email,
                role: user?.role,
                createdAt: new Date(user?.createdAt).toLocaleDateString("vi-VN"),
            });
        });

        workbook.xlsx.writeBuffer().then(function (data) {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = "danhsachnguoidung.xlsx";
            anchor.click();
            window.URL.revokeObjectURL(url);
        });
    }
    return (
        <Modal open={openModalPdf} onClose={() => setOpenModalPdf(false)} center >
            <div className="w-[750px] mx-auto mt-4">
                <div className="bg-white shadow-lg rounded-lg p-6 w-[750px]">

                    <div className="p-8 bg-white border border-gray-200">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800 mb-3">Danh sách người dùng</h1>
                                <p className="text-sm text-gray-600"> Ngày {new Date().toLocaleDateString("vi-VN")}</p>
                            </div>
                            <div className="text-right">
                                <h2 className="font-semibold mb-1">MovieWeb</h2>
                                <p className="text-sm text-gray-600">
                                    Nhổn
                                    <br />
                                    Hà Nội, Việt Nam 2025
                                </p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4">Danh sách người dùng:</h3>
                        </div>

                        <div className='max-h-96 overflow-y-auto'>
                            <table className="w-full mb-8 border-collapse">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border p-2 text-center">STT</th>
                                        <th className="border p-2 text-left">Tên người dùng</th>
                                        <th className="border p-2 text-left">Email</th>
                                        <th className="border p-2 text-left">Role</th>
                                        <th className="border p-2 text-right">Ngày tạo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.map((user, index) => (
                                        <tr>
                                            <td className="border p-2 text-center">{index + 1}</td>
                                            <td className="border p-2">{user?.userName}</td>
                                            <td className="border p-2 text-left">{user?.email}</td>
                                            <td className="border p-2 text-left">{user?.role}</td>
                                            <td className="border p-2 text-right">{new Date(user?.createdAt).toLocaleDateString("vi-VN")}</td>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={exportExcelFile}
                            className="flex items-center bg-green-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
                        >
                            Xuất Excel
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default UserExcel
