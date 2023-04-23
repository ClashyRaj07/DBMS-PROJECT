import * as React from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/material';


export default function LinearColor() {
    return (
        <Box>
            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={6}>
                <LinearProgress color="secondary" />
            </Stack>
            <div style={{ backgroundColor: 'white', width: '100%', height: '100vh', display: 'flex' }}>
                <img src={'./assets/twikle.gif'} alt="TwikTik" width={'20%'} style={{ margin: 'auto' }} />
            </div>
        </Box>

    );
}