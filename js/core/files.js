async function selectFilesToUpload(payload) {
    let notificationMessage = {
        type: 'showSuccess',
        message: "Images added successfully"
    };

    const selectedFiles = [];
    const { files, maxImages, filePath } = payload;

    if (!files || !files.length) {
        notificationMessage = {
            type: 'showInfo',
            message: "Upload at least one file"
        };
        return { selectedFiles, notificationMessage };
    }

    if (selectedFiles.length + files.length > maxImages) {
        notificationMessage = {
            type: 'showError',
            message: "You can only upload a maximum of " + maxImages + " images"
        };
        return { selectedFiles, notificationMessage };
    }

    for (const file of files) {
        if (file.type.startsWith('image/')) {
            selectedFiles.push({
                path: `${filePath}/${file.name}`,
                file
            });
        } else {
            notificationMessage = {
                type: 'showError',
                message: "Invalid file type. Must be an image"
            };
            return { selectedFiles, notificationMessage };
        }
    }

    return { selectedFiles, notificationMessage };
}

function prepareFileUploads(payload) {
    const { files, path, maxLength } = payload;
    const limitedFiles = maxLength ? files.slice(0, maxLength) : files;

    const fileUploads = [];
    for (const file of limitedFiles) {
        fileUploads.push({
            path: `${path}/${file.name}`,
            file
        });
    }
    return fileUploads;
}

function cleanObjects(items, badValues) {
    return items.map((obj) => {
        const cleaned = {};
        for (const key in obj) {
            if (!badValues.includes(obj[key])) {
                cleaned[key] = obj[key];
            }
        }
        return cleaned;
    });
}
