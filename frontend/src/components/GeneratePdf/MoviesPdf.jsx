
import { genreMap, languageCountryMap } from '@/lib/data';
import React from 'react';
import Modal from 'react-responsive-modal';
import ExcelJS from 'exceljs';

const MoviesPdf = ({ data, openModalPdf, setOpenModalPdf }) => {
    const exportExcelFile = () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("My Sheet");
        sheet.properties.defaultRowHeight = 50;

        sheet.columns = [
            {
                header: "Tên phim",
                key: 'title',
                width: 30
            },
            {
                header: "ID TMDB",
                key: 'movieId',
                width: 15
            },
            {
                header: "Ngôn ngữ",
                key: 'original_language',
                width: 15
            },
            {
                header: "Thể loại",
                key: 'genre_ids',
                width: 25
            },
            {
                header: "Điểm TMDB",
                key: 'vote_average',
                width: 15
            },
            {
                header: "Năm ra mắt",
                key: 'release_date',
                width: 20
            },
        ];

        data?.forEach((movie) => {
            sheet.addRow({
                title: movie?.title,
                movieId: movie?.movieId,
                original_language: movie?.original_language,
                genre_ids: movie?.genre_ids?.join(", "),
                vote_average: movie?.vote_average,
                release_date: new Date(movie?.release_date).toLocaleDateString("vi-VN"),
            });
        });

        workbook.xlsx.writeBuffer().then(function (data) {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = "danhsachphim.xlsx";
            anchor.click();
            window.URL.revokeObjectURL(url);
        });
    }
    return (
        <Modal open={openModalPdf} onClose={() => setOpenModalPdf(false)} center styles={{
            modal: {
                width: "95%",
                maxWidth: "950px",
                padding: 0,
            }
        }}>
            <div className="w-full max-w-[950px] mx-auto mt-4">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-[950px]">

                    <div className="p-8 bg-white border border-gray-200">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800 mb-3">Danh sách phim</h1>
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
                            <h3 className="text-lg font-semibold mb-4">Danh sách phim:</h3>
                        </div>

                        <div className='max-h-96 overflow-y-auto'>
                            <table className="w-full mb-8 border-collapse">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border p-2 text-left">STT</th>
                                        <th className="border p-2 text-left">Tên phim</th>
                                        <th className="border p-2 text-left">ID TMDB</th>
                                        <th className="border p-2 text-left">Ngôn ngữ</th>
                                        <th className="border p-2 text-left">Thể loại</th>
                                        <th className="border p-2 text-right">Điểm TMDB</th>
                                        <th className="border p-2 text-right">Năm ra mắt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.map((movie, index) => (
                                        <tr>
                                            <td className="border p-2 text-center">{index + 1}</td>
                                            <td className="border p-2">{movie?.title || movie?.original_title}</td>
                                            <td className="border p-2 text-left">{movie?.movieId}</td>
                                            <td className="border p-2 text-left">{languageCountryMap[movie?.original_language]}</td>
                                            <td className="border p-2 text-left">
                                                {movie?.genre_ids?.map((gid) => (
                                                    <span className='block mb-2' key={gid}>{genreMap[gid]}</span>
                                                ))}
                                            </td>
                                            <td className="border p-2 text-right">{movie?.vote_average}</td>
                                            <td className="border p-2 text-right">{new Date(movie?.release_date).toLocaleDateString("vi-VN")}</td>

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

export default MoviesPdf
