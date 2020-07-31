import React, { useState, useEffect } from "react"
import Select from "react-select"

import { getAllFolders } from "../utils/api"
import noti from "../utils/noti"

export default ({ onChange }) => {
    const [options, setOptions] = useState([])

    useEffect(() => {
        getAllFolders()
            .then(res => {
                if (!res.data.status) {
                    noti({
                        type: "danger",
                        title: "Failed",
                        message: "Get user folders failed"
                    })
                    return
                }

                setOptions(res.data.folders.map(item => ({ label: item.name, value: item._id })))
            })
    }, [])

    return <Select
        className="mb-2"
        placeholder="Select folder"
        options={options}
        onChange={e => onChange(e)}
    />
}