import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'

interface InspectionDetail {
  id: number
  sku: string
  po: string
  inspectionBatchNo: string
  inspectionTime: string
  inspector: string
  deviceModel: string
  snCode: string
  overallResult: 'passed' | 'failed'
  details: {
    id: number
    item: string
    content: string
    result: 'passed' | 'failed' | 'pending'
  }[]
}

const mockDetails: InspectionDetail[] = [
  {
    id: 1,
    sku: 'PTG_337L6R4K',
    po: 'PO26031014772205',
    inspectionBatchNo: 'INSP_PB44559562-5-1',
    inspectionTime: '2024-03-15 10:30:25',
    inspector: '张三',
    deviceModel: 'VM-1000',
    snCode: 'SN2024010001',
    overallResult: 'passed',
    details: [
      {
        id: 1,
        item: 'POS检测',
        content: '检测POS机功能是否正常',
        result: 'passed'
      }
    ]
  },
  {
    id: 2,
    sku: 'PTG_337L6R4K',
    po: 'PO26031014772205',
    inspectionBatchNo: 'INSP_PB44559562-5-1',
    inspectionTime: '2024-03-15 10:35:42',
    inspector: '李四',
    deviceModel: 'VM-1000',
    snCode: 'SN2024010002',
    overallResult: 'failed',
    details: [
      {
        id: 1,
        item: 'POS检测',
        content: '检测POS机功能是否正常',
        result: 'failed'
      }
    ]
  },
  {
    id: 3,
    sku: 'PTG_337L6R4K',
    po: 'PO26031014772206',
    inspectionBatchNo: 'INSP_PB44559562-5-2',
    inspectionTime: '2024-03-15 11:20:18',
    inspector: '王五',
    deviceModel: 'VM-2000',
    snCode: 'SN2024010003',
    overallResult: 'passed',
    details: [
      {
        id: 1,
        item: 'POS检测',
        content: '检测POS机功能是否正常',
        result: 'passed'
      }
    ]
  },
  {
    id: 4,
    sku: 'PTG_337L6R4K',
    po: 'PO26031014772206',
    inspectionBatchNo: 'INSP_PB44559562-5-2',
    inspectionTime: '2024-03-15 14:05:33',
    inspector: '赵六',
    deviceModel: 'VM-2000',
    snCode: 'SN2024010004',
    overallResult: 'passed',
    details: [
      {
        id: 1,
        item: 'POS检测',
        content: '检测POS机功能是否正常',
        result: 'passed'
      }
    ]
  },
  {
    id: 5,
    sku: 'PTG_337L6R4K',
    po: 'PO26031014772207',
    inspectionBatchNo: 'INSP_PB44559562-5-3',
    inspectionTime: '2024-03-16 09:15:47',
    inspector: '张三',
    deviceModel: 'VM-1500',
    snCode: 'SN2024010005',
    overallResult: 'failed',
    details: [
      {
        id: 1,
        item: 'POS检测',
        content: '检测POS机功能是否正常',
        result: 'passed'
      }
    ]
  }
]

interface TooltipState {
  isOpen: boolean
  position: { x: number; y: number }
  demandId: number
  title: string
  content: string
}

export default function QualityInspectionDetail() {
  const { id } = useParams<{ id: string }>()
  const [tooltip, setTooltip] = useState<TooltipState>({
    isOpen: false,
    position: { x: 0, y: 0 },
    demandId: 0,
    title: '',
    content: ''
  })
  
  const detail = mockDetails.find(d => d.id === parseInt(id || '1'))
  
  if (!detail) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">详情不存在</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-900">
            返回列表页
          </Link>
        </div>
      </div>
    )
  }

  const getResultIcon = (result: string) => {
    switch (result) {
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
    }
  }

  const getResultText = (result: string) => {
    switch (result) {
      case 'passed':
        return '通过'
      case 'failed':
        return '不通过'
      default:
        return '待检测'
    }
  }

  const getResultClass = (result: string) => {
    switch (result) {
      case 'passed':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

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
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回列表
            </Link>
            <h1 className="text-2xl font-semibold text-gray-900">售货机检测详情</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              SN码: <span className="font-medium text-gray-900">{detail.snCode}</span>
            </div>
            <div className="text-sm text-gray-500">
              设备型号: <span className="font-medium text-gray-900">{detail.deviceModel}</span>
            </div>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              getResultClass(detail.overallResult)
            }`}>
              {getResultIcon(detail.overallResult)}
              <span className="ml-2">{getResultText(detail.overallResult)}</span>
            </div>
          </div>
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
            onMouseEnter={(e) => openTooltip(e, 9, '需求描述：售货机检测详情', '展示所有售货机的检测结果，包括基础信息和检测明细')}
          >
            9
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            {/* 基础信息 */}
            <div className="relative">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">基础信息</h2>
              {/* 角标 - 基础信息 */}
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
              onMouseEnter={(e) => openTooltip(e, 10, '需求描述：基础信息', '展示SKU、PO、质检批次号、实际质检时间、质检员、设备型号、SN码')}
            >
              10
            </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">SKU</h3>
                    <p className="text-gray-900">{detail.sku}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">PO</h3>
                    <p className="text-gray-900">{detail.po}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">质检批次号</h3>
                    <p className="text-gray-900">{detail.inspectionBatchNo}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">实际质检时间</h3>
                    <p className="text-gray-900">{detail.inspectionTime}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">质检员</h3>
                    <p className="text-gray-900">{detail.inspector}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">设备型号</h3>
                    <p className="text-gray-900">{detail.deviceModel}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">SN码</h3>
                    <p className="text-gray-900">{detail.snCode}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 检测明细 */}
            <div className="relative">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">检测明细</h2>
              {/* 角标 - 检测明细 */}
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
              onMouseEnter={(e) => openTooltip(e, 11, '需求描述：检测明细', '展示检测项、检测内容、检测结果')}
            >
              11
            </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">检测项</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">检测内容</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">检测结果</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {detail.details.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.item}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{item.content}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            getResultClass(item.result)
                          }`}>
                            {getResultIcon(item.result)}
                            <span className="ml-1">{getResultText(item.result)}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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