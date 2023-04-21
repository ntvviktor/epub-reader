// import { uploadFileRequest } from '@/domains/upload/upload.services';
import {auth, storage} from "@/lib/firebase";
import {Box, Button, Stack, VStack} from "@chakra-ui/react";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import React, {useRef, useState} from "react";
import {AiOutlineCloudUpload} from 'react-icons/ai'

import Router from 'next/router'

// Upload epub file to Firebase storage
export default function DragDropFile() {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState("");
    const [downloadURL, setDownloadURL] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = Array.from(e.target.files)[0];
            const fileName = file.name;

            // Makes reference to the storage bucket location
            const storageRef = ref(
                storage,
                `uploads/${auth.currentUser?.uid}/${Date.now()}_${fileName}`
            );
            setUploading(true);

            // Starts the upload
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const pct = (
                        (snapshot.bytesTransferred / snapshot.totalBytes) *
                        100
                    ).toFixed(0);
                    setProgress(pct);
                },
                (error) => {
                    console.error(error);
                },
                () => {
                    // Get downloadURL AFTER task resolves
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setDownloadURL(url);
                        Router.push({
                            pathname: '/book',
                            query: {
                                link: url,
                            },
                        })
                        setUploading(false);
                    })
                }
            );
        }
    };

    const onButtonClick = () => {
        if (inputRef.current !== null) {
            inputRef.current.click();
        }
    };

    return (
        <Box>
            {uploading && (
                <Stack>
                    <Button isLoading colorScheme="teal" loadingText="uploading"></Button>
                    <h3>{progress}%</h3>
                </Stack>
            )}

            {!uploading && (
                <VStack>
                    <label>
                        <input style={{'display': 'none'}} ref={inputRef} type="file" onChange={uploadFile}
                               accept=".epub"/>
                        <Button color={"whiteAlpha.900"} size={['md', 'lg']} bg='#A68E79' _hover={{bg: '#BDA580'}}
                                leftIcon={<AiOutlineCloudUpload/>} onClick={onButtonClick}>
                            Upload .epub file
                        </Button>
                    </label>
                </VStack>
            )}
        </Box>
    );
}
