import { Box, Typography } from "@mui/material";
import react, { useEffect, useState } from "react";
export default ({ ...props }) => {
    const [msg, setMsg] = useState("");

    useEffect(() => {
        const { data } = props;
        if (data) {
            const addr = data.address.substr(0, 4) + "..."+ data.address.substr(40);
            setMsg(`${addr} opened ${data.open_price} and won ${data.win_price} SOL`)
        }

    }, [props]);

    console.log("props", props);
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            background: 'white',
            padding: 2,
            borderColor: 'black',
            borderRadius: 2,
        }}>
            <Box sx={{display: 'flex'}}>
                <img style={{ height: 30, width: 50 }} src={`assets/box/${props.data.box_id + 1}.png`} />
                <Typography >{msg}</Typography>
            </Box>
            <Typography sx={{textAlign: "right"}}>{3} minutes ago</Typography>
        </Box>
    )
}