import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function Alerts({ alert }) { // Destructure alert from props
    // Function to capitalize the first letter
    const capitalize = (word) => {
        return word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : '';
    };

    return (
        <div className="alertDiv">
            {alert && alert.type && alert.message ? ( // Ensure alert has type and message
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity={alert.type}>
                        <AlertTitle>{capitalize(alert.type)}</AlertTitle>
                        {alert.message}
                    </Alert>
                </Stack>
            ) : null}
        </div>
    );
}
