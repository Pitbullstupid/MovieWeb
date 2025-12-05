
import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faCircleXmark, faCrown, faSearch } from "@fortawesome/free-solid-svg-icons"
import { languageCountryMap } from "@/lib/data"
import { Skeleton } from "./ui/skeleton"
import MovieModalForm from "./MovieModalForm"
import UserModalForm from "./UserModalForm"
import { toast } from "sonner"

function DataTable({ data, columns, searchKey, deleteMovie, deleteUser, handleUpdateMovie, handleUpdateUser, setSelectedOrder, setOpenModalOrder }) {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [openModalMovie, setOpenModalMovie] = React.useState(false);
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [openModalUser, setOpenModalUser] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);

  // ===== THÊM ACTIONS NẾU CHƯA CÓ =====
  const enhancedColumns = React.useMemo(() => {
    const hasActions = columns.some((c) => c.id === "actions")

    if (!hasActions) {
      return [
        ...columns,
        {
          id: "actions",
          enableHiding: false,
          cell: ({ row }) => {
            const item = row.original
            return (
              <>
                <div className="flex justify-center">
                  <DropdownMenu >
                    <DropdownMenuTrigger asChild  className="cursor-pointer">
                      <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-700 hover:text-white">
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-36">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      {searchKey == "title" ? (
                        <>
                          <DropdownMenuItem onClick={() => deleteMovie(item._id)}  className="cursor-pointer">
                            Xóa phim
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => { setSelectedMovie(item); setOpenModalMovie(true) }}  className="cursor-pointer">Sửa</DropdownMenuItem>
                        </>
                      ) : searchKey == "userName" ? (
                        <>
                          <DropdownMenuItem onClick={() => deleteUser(item._id)}  className="cursor-pointer">
                            Xóa người dùng
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => { setSelectedUser(item); setOpenModalUser(true) }}  className="cursor-pointer">Sửa</DropdownMenuItem>
                        </>
                      ) : (
                        <>
                          <DropdownMenuItem onClick={() => {setSelectedOrder(item._id); setOpenModalOrder(true)}}  className="cursor-pointer">
                            In hóa đơn
                          </DropdownMenuItem>
                        </>
                      )}


                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            )
          },
        },
      ]
    }

    return columns
  }, [columns])

  // ===== TABLE =====
  const table = useReactTable({
    data,
    columns: enhancedColumns,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {searchKey && (
          <InputGroup className="w-[280px] border-2 border-[#2F2F2F]">
            <InputGroupInput
              placeholder={`Search by ${searchKey}...`}
              className="text-white"
              value={table.getColumn(searchKey)?.getFilterValue() ?? ""}
              onChange={(e) => table.getColumn(searchKey)?.setFilterValue(e.target.value)}
            />

            <InputGroupAddon>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              {table.getRowModel().rows.length} / {table.getPreFilteredRowModel().rows.length}
            </InputGroupAddon>
          </InputGroup>
        )}

        {/* Column Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  checked={col.getIsVisible()}
                  onCheckedChange={(val) => col.toggleVisibility(!!val)}
                  className="capitalize"
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ===== TABLE ===== */}
      <div className="overflow-hidden rounded-md border border-[#2F2F2F] bg-bgdefault text-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className="hover:bg-transparent">
                {hg.headers.map((header) => (
                  <TableHead key={header.id} className="px-3 py-2 font-semibold text-white">
                    {!header.isPlaceholder &&
                      flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-gray-800 border-[#2F2F2F]">
                  {row.getVisibleCells().map((cell) => {
                    const value = cell.getValue()

                    if (cell.column.id === "release_date" || cell.column.id === "createdAt") {
                      return (
                        <TableCell key={cell.id} className="px-3">
                          {new Date(value).toLocaleDateString("vi-VN")}
                        </TableCell>
                      )
                    }
                    if (cell.column.id === "adult") {
                      return (
                        <TableCell key={cell.id} className="px-3">
                          {value ? (
                            <p className="px-2 py-1 border border-[#2F2F2F] rounded-xl w-[80px] text-center"><FontAwesomeIcon icon={faCircleCheck} className="text-green-500" /> Có</p>
                          ) : (
                            <p className="px-2 py-1 border border-[#2F2F2F] rounded-xl w-[80px] text-center"><FontAwesomeIcon icon={faCircleXmark} className="text-red-500" /> Không</p>
                          )}
                        </TableCell>
                      )
                    }
                    if (cell.column.id === "isPremium") {
                      const now = new Date()
                      const premiumDate = new Date(value)
                      const isPremiumActive = premiumDate > now
                      return (
                        <TableCell key={cell.id} className="px-3">
                          {isPremiumActive ? (
                            <p className="px-2 py-1 border border-[#2F2F2F] rounded-xl w-[80px] text-center"><FontAwesomeIcon icon={faCircleCheck} className="text-green-500" /> Có</p>
                          ) : (
                            <p className="px-2 py-1 border border-[#2F2F2F] rounded-xl w-[80px] text-center"><FontAwesomeIcon icon={faCircleXmark} className="text-red-500" /> Không</p>
                          )}
                        </TableCell>
                      )
                    }
                    if (cell.column.id === "payment") {
                      return (
                        <TableCell key={cell.id} className="px-3">
                          {value ? (
                            <p className="px-2 py-1 border border-[#2F2F2F] rounded-xl w-[130px] text-center"><FontAwesomeIcon icon={faCircleCheck} className="text-green-500" /> Đã thanh toán</p>
                          ) : (
                            <p className="px-2 py-1 border border-[#2F2F2F] rounded-xl w-[130px] text-center"><FontAwesomeIcon icon={faCircleXmark} className="text-red-500" /> Thanh toán lỗi</p>
                          )}
                        </TableCell>
                      )
                    }


                    if (cell.column.id === "poster_path") {
                      const url = `https://image.tmdb.org/t/p/original/${row.original.backdrop_path}`

                      return (
                        <TableCell key={cell.id} className="px-3">
                          <div className="relative h-20 w-32">
                            <div className="absolute inset-0" id={`sk-${row.id}`}>
                              <Skeleton className="h-full w-full rounded" />
                            </div>

                            <img
                              src={url}
                              className="h-full w-full rounded object-cover opacity-0 transition-opacity duration-500"
                              onLoad={(e) => {
                                const skeleton = document.getElementById(`sk-${row.id}`)
                                if (skeleton) {
                                  setTimeout(() => {
                                    skeleton.style.display = "none"
                                    e.target.style.opacity = 1
                                  }, 500)
                                }
                              }}
                            />
                          </div>
                        </TableCell>
                      )
                    }
                    if (cell.column.id === "Avatar") {
                      return (
                        <TableCell key={cell.id} className="px-3">
                          <div className="relative h-15 w-15">
                            <div className="absolute inset-0" id={`sk-${row.id}`}>
                              <Skeleton className="h-full w-full rounded-full" />
                            </div>
                            <img
                              src={value ?? "https://github.com/shadcn.png"}
                              className="h-full w-full rounded-full object-cover opacity-0 transition-opacity duration-500"
                              onLoad={(e) => {
                                const skeleton = document.getElementById(`sk-${row.id}`)
                                if (skeleton) {
                                  setTimeout(() => {
                                    skeleton.style.display = "none"
                                    e.target.style.opacity = 1
                                  }, 500)
                                }
                              }}
                            />
                          </div>
                        </TableCell>
                      )
                    }


                    if (cell.column.id === "title") {
                      return (
                        <TableCell key={cell.id} className="px-3">
                          <p className="truncate" style={{ width: "300px", maxWidth: "300px" }}>
                            {value}
                          </p>
                        </TableCell>
                      )
                    }
                    if (cell.column.id === "original_language") {
                      const code = cell.getValue();
                      const languageName = languageCountryMap[code] || code;

                      return (
                        <TableCell key={cell.id} className="px-3 text-left">
                          {languageName}
                        </TableCell>
                      );
                    }
                    if (cell.column.id === "months") {
                      return (
                        <TableCell key={cell.id} className="px-3 text-left">
                          {cell.getValue()} Tháng <FontAwesomeIcon icon={faCrown} className="text-default" />
                        </TableCell>
                      );
                    }
                    if (cell.column.id === "price") {
                      return (
                        <TableCell key={cell.id} className="px-3 text-left">
                          <p className="px-2 py-2 border border-[#2F2F2F] w-[100px] rounded-xl bg-gray-700 text-center">{cell.getValue().toLocaleString("vi-VN")} VNĐ</p>
                        </TableCell>
                      );
                    }

                    if (typeof value === "number") {
                      return (
                        <TableCell key={cell.id} className="px-3 text-left ">
                          <p className="px-2 py-2 border border-[#2F2F2F] w-[50px] rounded-xl bg-gray-700 text-center">{value.toFixed(1)}</p>
                        </TableCell>
                      )
                    }

                    return (
                      <TableCell
                        key={cell.id}
                        className="px-3 "
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>

                    )
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="text-center py-10" colSpan={enhancedColumns.length}>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ===== PAGINATION ===== */}
      <div className="flex justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.previousPage();
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }, 50);
          }}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.nextPage();
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }, 50);
          }}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <MovieModalForm
        open={openModalMovie}
        onOpenChange={setOpenModalMovie}
        initialData={selectedMovie}
        onSubmit={(movieData) => handleUpdateMovie(selectedMovie._id, movieData)}
        mode="edit"
      />
      <UserModalForm
        open={openModalUser}
        onOpenChange={setOpenModalUser}
        initialData={selectedUser}
        onSubmit={(userData) => handleUpdateUser(selectedUser._id, userData)}
        mode="edit"
      />

    </div>
  )
}

export default DataTable
