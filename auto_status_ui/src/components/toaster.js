import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function toaster(props) {

    if(props.status == 'Success') {
        toast.success(`${props.message}`,{
            position : "top-right",
            closeOnClick : true,
            pauseOnHover : true,
            draggable : true
        });
    }
    if(props.status == 'Error'){
        toast.error(`${props.message}`,{
            position : "top-right",
            closeOnClick : true,
            pauseOnHover : true,
            draggable : true
        });
    }
    if(props.status == 'Info'){
        toast.info(`${props.message}`,{
            position : "top-right",
            closeOnClick : true,
            pauseOnHover : true,
            draggable : true
        });
    }
    if(props.status == 'Warning'){
        toast.warn(`${props.message}`,{
            position : "top-right",
            closeOnClick : true,
            pauseOnHover : true,
            draggable : true
        });
    }
    return (
        <div>
            <ToastContainer />
        </div>
    )
}

export default toaster
