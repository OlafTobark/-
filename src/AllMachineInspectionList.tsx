import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Eye, ChevronLeft, ChevronRight, X } from 'lucide-react'

interface MachineInspectionRecord {
  id: number
  sku: string
  po: string
  inspectionBatchNo: string
  inspectionTime: string
  inspector: string
  deviceModel: string
  snCode: string
  inspectionResult: 'passed' | 'failed'
}

const mockData: MachineInspectionRecord[] = [
  { id: 1, sku: 'PTG_337L6R4K', po: 'PO26031014772205', inspectionBatchNo: 'INSP_PB44559562-5-1', inspectionTime: '2024-03-15 10:30:25', inspector: '张三', deviceModel: 'VM-1000', snCode: 'SN2024010001', inspectionResult: 'passed' },
  { id: 2, sku: 'PTG_337L6R4K', po: 'PO26031014772205', inspectionBatchNo: 'INSP_PB44559562-5-1', inspectionTime: '2024-03-15 10:35:42', inspector: '李四', deviceModel: 'VM-1000', snCode: 'SN2024010002', inspectionResult: 'failed' },
  { id: 3, sku: 'PTG_337L6R4K', po: 'PO26031014772206', inspectionBatchNo: 'INSP_PB44559562-5-2', inspectionTime: '2024-03-15 11:20:18', inspector: '王五', deviceModel: 'VM-2000', snCode: 'SN2024010003', inspectionResult: 'passed' },
  { id: 4, sku: 'PTG_337L6R4K', po: 'PO26031014772206', inspectionBatchNo: 'INSP_PB44559562-5-2', inspectionTime: '2024-03-15 14:05:33', inspector: '赵六', deviceModel: 'VM-2000', snCode: 'SN2024010004', inspectionResult: 'passed' },
  { id: 5, sku: 'PTG_337L6R4K', po: 'PO26031014772207', inspectionBatchNo: 'INSP_PB44559562-5-3', inspectionTime: '2024-03-16 09:15:47', inspector: '张三', deviceModel: 'VM-1500', snCode: 'SN2024010005', inspectionResult: 'failed' },
  { id: 6, sku: 'PTG_337L6R4K', po: 'PO26031014772207', inspectionBatchNo: 'INSP_PB44559562-5-3', inspectionTime: '2024-03-16 10:22:11', inspector: '李四', deviceModel: 'VM-1000', snCode: 'SN2024010006', inspectionResult: 'passed' },
  { id: 7, sku: 'PTG_337L6R4K', po: 'PO26031014772207', inspectionBatchNo: 'INSP_PB44559562-5-4', inspectionTime: '2024-03-16 15:40:59', inspector: '王五', deviceModel: 'VM-3000', snCode: 'SN2024010007', inspectionResult: 'passed' },
  { id: 8, sku: 'PTG_337L6R4K', po: 'PO26031014772208', inspectionBatchNo: 'INSP_PB44559562-5-4', inspectionTime: '2024-03-17 08:55:23', inspector: '赵六', deviceModel: 'VM-3000', snCode: 'SN2024010008', inspectionResult: 'passed' },
  { id: 9, sku: 'PTG_337L6R4K', po: 'PO26031014772209', inspectionBatchNo: 'INSP_PB44559562-5-5', inspectionTime: '2024-03-17 13:12:36', inspector: '张三', deviceModel: 'VM-1500', snCode: 'SN2024010009', inspectionResult: 'failed' },
  { id: 10, sku: 'PTG_337L6R4K', po: 'PO26031014772209', inspectionBatchNo: 'INSP_PB44559562-5-5', inspectionTime: '2024-03-17 16:28:44', inspector: '李四', deviceModel: 'VM-2000', snCode: 'SN2024010010', inspectionResult: 'passed' },
  { id: 11, sku: 'PTG_337L6R4K', po: 'PO26031014772210', inspectionBatchNo: 'INSP_PB44559562-5-6', inspectionTime: '2024-03-18 09:45:12', inspector: '王五', deviceModel: 'VM-1000', snCode: 'SN2024010011', inspectionResult: 'passed' },
  { id: 12, sku: 'PTG_337L6R4K', po: 'PO26031014772210', inspectionBatchNo: 'INSP_PB44559562-5-6', inspectionTime: '2024-03-18 11:30:27', inspector: '赵六', deviceModel: 'VM-1500', snCode: 'SN2024010012', inspectionResult: 'passed' }
]

interface TooltipState {
  isOpen: boolean
  position: { x: number; y: number }
  demandId: number
  title: string
  content: string
}

export default function AllMachineInspectionList() {
  const [searchText, setSearchText] = useState('')
  const [filterResult, setFilterResult] = useState<'all' | 'passed' | 'failed'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [tooltip, setTooltip] = useState<TooltipState>({
    isOpen: false,
    position: { x: 0, y: 0 },
    demandId: 0,
    title: '',
    content: ''
  })
  const pageSize = 5

  const filteredData = mockData.filter(item => {
    const matchesSearch = searchText === '' ||
      item.sku.toLowerCase().includes(searchText.toLowerCase()) ||
      item.po.toLowerCase().includes(searchText.toLowerCase()) ||
      item.inspectionBatchNo.toLowerCase().includes(searchText.toLowerCase()) ||
      item.snCode.toLowerCase().includes(searchText.toLowerCase()) ||
      item.deviceModel.toLowerCase().includes(searchText.toLowerCase()) ||
      item.inspector.toLowerCase().includes(searchText.toLowerCase())

    const matchesFilter = filterResult === 'all' || item.inspectionResult === filterResult

    return matchesSearch && matchesFilter
  })

  const totalPages = Math.ceil(filteredData.length / pageSize)
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const openTooltip = (e: React.MouseEvent, demandId: number, title: string, content: string) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    // 调整位置确保在屏幕内显示
    setTooltip({
      isOpen: true,
      position: { x: 600, y: rect.bottom + 10 },
      demandId,
      title,
      content
    })
  }

  const closeTooltip = () => {
    setTooltip(prev => ({ ...prev, isOpen: false }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 页面头部 */}
        <div className="mb-6 relative">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ChevronLeft className="w-5 h-5 mr-2" />
              返回质检报告-售货机检测
            </Link>
            <h1 className="text-2xl font-semibold text-gray-900">全部售货机检测结果</h1>
          </div>
          <p className="text-sm text-gray-500">查看所有售货机的质检记录</p>
          {/* 角标 - 页面头部 */}
          <div 
            className="prd-annotation-badge" 
            style={{ 
              display: 'inline-block', 
              verticalAlign: 'top', 
              background: 'rgb(250, 173, 20)', 
              color: '#fff', 
              fontSize: '10px', 
              fontWeight: 'bold', 
              lineHeight: '14px', 
              padding: '0px 4px', 
              borderRadius: '2px', 
              border: 'none', 
              cursor: 'pointer',
              position: 'absolute' as 'absolute',
              top: '8px',
              right: '8px',
              zIndex: 99999
            }}
            onMouseEnter={(e) => openTooltip(e, 5, '需求描述：全部售货机检测结果', '展示所有售货机的检测结果，包含完整字段信息')}
          >
            5
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          {/* 搜索区域 */}
          <div className="p-4 border-b border-gray-200 relative">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索SKU、PO、质检批次号、SN码、设备型号或质检员..."
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setFilterResult('all')
                    setCurrentPage(1)
                  }}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    filterResult === 'all'
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  全部
                </button>
                <button
                  onClick={() => {
                    setFilterResult('passed')
                    setCurrentPage(1)
                  }}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    filterResult === 'passed'
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  通过
                </button>
                <button
                  onClick={() => {
                    setFilterResult('failed')
                    setCurrentPage(1)
                  }}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    filterResult === 'failed'
                      ? 'bg-red-500 text-white border-red-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  不通过
                </button>
              </div>
            </div>
            {/* 角标 - 搜索区域 */}
            <div 
              className="prd-annotation-badge" 
              style={{ 
                display: 'inline-block', 
                verticalAlign: 'top', 
                background: 'rgb(250, 173, 20)', 
                color: '#fff', 
                fontSize: '10px', 
                fontWeight: 'bold', 
                lineHeight: '14px', 
                padding: '0px 4px', 
                borderRadius: '2px', 
                border: 'none', 
                cursor: 'pointer',
                position: 'absolute' as 'absolute',
                top: '8px',
                right: '8px',
                zIndex: 1000
              }}
              onMouseEnter={(e) => openTooltip(e, 6, '需求描述：搜索和筛选功能', '支持按SKU、PO、质检批次号、SN码、设备型号、质检员搜索，支持按检测结果（全部/通过/不通过）筛选')}
            >
              6
            </div>
          </div>

          {/* 数据表格 */}
          <div className="overflow-x-auto relative">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PO</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">质检批次号</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">实际质检时间</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">质检员</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">设备型号</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SN码</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">检测结果</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                      暂无数据
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.sku}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.po}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.inspectionBatchNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.inspectionTime}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.inspector}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.deviceModel}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.snCode}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            record.inspectionResult === 'passed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {record.inspectionResult === 'passed' ? '通过' : '不通过'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link
                          to={`/detail/${record.id}`}
                          className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          查看详情
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {/* 角标 - 数据表格 */}
            <div 
              className="prd-annotation-badge" 
              style={{ 
                display: 'inline-block', 
                verticalAlign: 'top', 
                background: 'rgb(250, 173, 20)', 
                color: '#fff', 
                fontSize: '10px', 
                fontWeight: 'bold', 
                lineHeight: '14px', 
                padding: '0px 4px', 
                borderRadius: '2px', 
                border: 'none', 
                cursor: 'pointer',
                position: 'absolute' as 'absolute',
                top: '8px',
                right: '8px',
                zIndex: 1000
              }}
              onMouseEnter={(e) => openTooltip(e, 7, '需求描述：数据展示', '展示SKU、PO、质检批次号、实际质检时间、质检员、设备型号、SN码、检测结果、操作列')}
            >
              7
            </div>
          </div>

          {/* 分页区域 */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between relative">
              <div className="text-sm text-gray-500">
                显示 {(currentPage - 1) * pageSize + 1} 到 {Math.min(currentPage * pageSize, filteredData.length)} 条，共 {filteredData.length} 条
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg border transition-colors ${
                      currentPage === page
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              {/* 角标 - 分页区域 */}
              <div 
                className="prd-annotation-badge" 
                style={{ 
                  display: 'inline-block', 
                  verticalAlign: 'top', 
                  background: 'rgb(250, 173, 20)', 
                  color: '#fff', 
                  fontSize: '10px', 
                  fontWeight: 'bold', 
                  lineHeight: '14px', 
                  padding: '0px 4px', 
                  borderRadius: '2px', 
                  border: 'none', 
                  cursor: 'pointer',
                  position: 'absolute' as 'absolute',
                  top: '8px',
                  right: '8px',
                  zIndex: 1000
                }}
                onMouseEnter={(e) => openTooltip(e, 8, '需求描述：分页功能', '每页显示5条记录，支持翻页')}
              >
                8
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 浮窗 */}
      {tooltip.isOpen && (
        <div 
          className="prd-annotation-tooltip" 
          style={{
            position: 'fixed' as 'fixed',
            left: tooltip.position.x + 8,
            top: tooltip.position.y + 8,
            width: '450px',
            backgroundColor: '#f0efef',
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 9999,
            padding: '16px',
            maxHeight: '400px',
            overflowY: 'auto'
          }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <div 
                className="prd-annotation-badge" 
                style={{ 
                  display: 'inline-block', 
                  verticalAlign: 'top', 
                  background: 'rgb(250, 173, 20)', 
                  color: '#fff', 
                  fontSize: '10px', 
                  fontWeight: 'bold', 
                  lineHeight: '14px', 
                  padding: '0px 4px', 
                  borderRadius: '2px', 
                  border: 'none',
                  marginRight: '8px'
                }}
              >
                {tooltip.demandId}
              </div>
              <h3 className="font-medium text-gray-900">{tooltip.title}</h3>
            </div>
            <button 
              onClick={closeTooltip}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-700 line-height-16">{tooltip.content}</p>
          </div>
        </div>
      )}
    </div>
  )
}