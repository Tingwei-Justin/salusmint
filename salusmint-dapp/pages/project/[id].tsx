import React from 'react'
import Layout from '@components/Layout'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

function ProjectPage() {
  const data = [
    {
      name: '2022-06-02',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: '2022-07-02',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: '2022-08-02',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: '2022-09-02',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: '2022-10-02',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: '2022-11-02',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: '2022-12-02',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ]

  const RADIAN = Math.PI / 180
  const healthIndicatorData = [
    { name: 'A', value: 33, color: '#ff0000' },
    { name: 'B', value: 33, color: '#FF9933' },
    { name: 'C', value: 33, color: '#00ff00' },
  ]
  const cx = 150
  const cy = 200
  const iR = 50
  const oR = 100
  const value = 50

  const needle = (value, data, cx, cy, iR, oR, color) => {
    let total = 0
    data.forEach((v) => {
      total += v.value
    })
    const ang = 180.0 * (1 - value / total)
    const length = (iR + 2 * oR) / 3
    const sin = Math.sin(-RADIAN * ang)
    const cos = Math.cos(-RADIAN * ang)
    const r = 5
    const x0 = cx + 5
    const y0 = cy + 5
    const xba = x0 + r * sin
    const yba = y0 - r * cos
    const xbb = x0 - r * sin
    const ybb = y0 + r * cos
    const xp = x0 + length * cos
    const yp = y0 + length * sin

    return [
      <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" key={'1'} />,
      <path
        d={`M${xba},${yba}L${xbb},${ybb},L${xp},${yp},L${xba},${yba}`}
        stroke="#none"
        fill={color}
        key={'2'}
      />,
    ]
  }
  return (
    <div className="flex w-full justify-center px-4">
      <div className="h-full w-full">
        <div className="flex h-full w-full border-black">
          <div className="w-1/3 divide-y divide-black border-r-2 border-black">
            <div className="py-2 px-4 text-3xl font-bold tracking-wider">
              ETH DENVER NFT DEMO
            </div>
            <div className="flex w-full divide-x divide-black px-4  text-lg">
              <span className="w-1/3 py-2 font-bold">Creator</span>
              <span className="w-2/3 px-4 py-2">Sartoshi</span>
            </div>
            <div className="flex w-full divide-x divide-black px-4  text-lg">
              <span className="w-1/3 py-2 font-bold">Total amount</span>
              <span className="w-2/3 px-4 py-2">10,000</span>
            </div>
            <div className="p-4 opacity-80">
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text
              used in laying out print, graphic or web designs. The passage is
              attributed to an unknown typesetter in the 15th century who is
              thought to have scrambled parts of Cicero De Finibus Bonorum et
              Malorum for use in a type specimen book. It usually begins with:
            </div>
            <div className="w-full border-2 border-black" />
            <div className="w-full">
              <div className="px-4 py-2 text-xl font-bold">
                Health Indicator
              </div>
              <div className="w-full border-b-2 border-black" />
              <div className="flex w-full items-center justify-center">
                <PieChart width={400} height={500}>
                  <Pie
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                    data={healthIndicatorData}
                    cx={cx}
                    cy={cy}
                    innerRadius={iR}
                    outerRadius={oR}
                    fill="#8884d8"
                    stroke="none"
                  >
                    {healthIndicatorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  {needle(
                    value,
                    healthIndicatorData,
                    cx,
                    cy,
                    iR,
                    oR,
                    '#d0d000'
                  )}
                </PieChart>
              </div>
            </div>
          </div>

          <div className="relative h-full w-2/3 overflow-hidden">
            <div className="absolute -top-4 -left-4 h-4 w-8 bg-black" />
            <div className="relative flex h-[45vh] w-full justify-center border-b border-black pt-6">
              <ResponsiveContainer width="80%" height="80%">
                <AreaChart
                  width={500}
                  height={400}
                  data={data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                  <Area
                    type="monotone"
                    dataKey="pv"
                    stackId="1"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                  />
                  <Area
                    type="monotone"
                    dataKey="amt"
                    stackId="1"
                    stroke="#ffc658"
                    fill="#ffc658"
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="absolute bottom-4 w-full text-center text-xl font-bold">
                NFT VAULT
              </div>
            </div>
            <div className="flex h-full w-full divide-x divide-black">
              <div className="relative h-[40vh] w-1/2">
                <div className="absolute bottom-4 left-4 text-xl font-bold">
                  Borrow
                </div>
              </div>
              <div className="relative h-[40vh] w-1/2">
                <div className="absolute bottom-4 left-4 text-xl font-bold">
                  Burn
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProjectPage

ProjectPage.Layout = Layout
