import React, { useState } from 'react'
import DataTable from '@/components/DataTable'
import { Button } from '@/components/ui/button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { orderColumns } from '@/lib/data'
import Invoice from '@/components/GeneratePdf/Invoice'
import { toast } from 'sonner'

const Orders = ({ orderList, userList }) => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const sortedOrders = [...orderList].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    const detailOrders = sortedOrders.map(order => {
        const user = userList.find(u => u._id === order.userId);
        return {
            ...order,
            userNameOrder: user?.userName ?? "Không xác định",
            Avatar: user?.Avatar ?? "https://github.com/shadcn.png",
        };
    });
    return (
        <>
            <div className='ml-16 flex flex-col items-center mt-[63px]'>
                <div className='mt-4 w-[96%]'>
                    {/*  */}
                    <div>
                        <p className='text-white font-bold text-3xl'>Quản lý đơn hàng</p>
                    </div>
                    {/*  */}
                    <div className='mt-10 flex justify-end'>
                        <div className="flex flex-wrap items-center gap-4">
                            <Button variant="default" className="border-2 border-[#2F2F2F] bg-[#181A1F] text-white hover:opacity-90" onClick={() => toast.info("Không biết in gì !!! :((")}>
                                <FontAwesomeIcon icon={faPrint} /> Tạo bản in
                            </Button>
                        </div>
                    </div>

                    {/* DataTable */}
                    <div className='mt-4'>
                        <DataTable data={detailOrders} columns={orderColumns} searchKey="userNameOrder" setSelectedOrder={setSelectedOrder} setOpenModalOrder={setOpenModal}/>
                    </div>
                </div>
            </div>
            <Invoice data={detailOrders} userList={userList} openModal={openModal} setOpenModal={setOpenModal} selectedOrder={selectedOrder}/>
        </>
    )
}

export default Orders
