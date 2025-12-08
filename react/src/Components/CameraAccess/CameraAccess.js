export const triggerCamera = async (fileInputRef, onFileSelected) =>{
    if(!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        alert("Camera not supported in this device.");
        return;
    }
    const devices = await navigator.mediaDevices.enumerateDevices();
    const hasCamera = devices.some(device => device.kind === 'videoinput');
    if(!hasCamera) {
        alert("No camera found on this device.");
        return;
    }
    if(!fileInputRef.current) return;
    fileInputRef.current.click();
    const handleChange = (event) => {
        const file = event.target.files[0];
        if(file) onFileSelected(file);
        fileInputRef.current.removeEventListener("change", handleChange);
    };
    fileInputRef.current.addEventListener("change", handleChange);
};