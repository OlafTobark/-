import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import QualityInspectionList from './QualityInspectionList'
import QualityInspectionDetail from './QualityInspectionDetail'
import AllMachineInspectionList from './AllMachineInspectionList'
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QualityInspectionList />} />
        <Route path="/all-machines" element={<AllMachineInspectionList />} />
        <Route path="/detail/:id" element={<QualityInspectionDetail />} />
      </Routes>
    </Router>
  )
}

export default App
