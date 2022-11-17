const saveFile = async (blob, name) => {
    const file = new File([blob], name, { type: blob.type, lastModified: new Date().getTime()});
    return file;
};

export {
    saveFile
};