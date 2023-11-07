import React from 'react'

const Input = ({label,country,setter,val,read,data}) => {
  return (
    <>
        <div className="w-2/4 text-center mt-5 flex  justify-between ps-12 pe-12 align-center p-8 rounded-md border-2">
            <div>
                <span className="me-4 font-semibold">{label}</span>
                <select className="text-white bg-black border-white border rounded-md" onChange={(e)=>{console.log(e.target.value); setter(e.target.value)}}>
                    {
                        country.map((val,i)=>(
                            <option key={i} className="bg-black text-white" >{val}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                <input type="number" className="border bg-black text-white rounded-md" onChange={(e)=>val(e.target.value)} readOnly={read} value={data} />
            </div>
        </div>
    </>
  )
}

export default Input