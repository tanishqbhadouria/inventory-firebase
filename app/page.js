'use client'
import Image from 'next/image'
import {useState, useEffect} from 'react';
import {firestore} from '@/firebase.js';
import {Box, Typography, Modal, Stack, Button} from '@mui/material'
import {query,collection,getDocs,doc,getDoc,setDoc, deleteDoc} from 'firebase/firestore';
import { TextField } from '@mui/material';

export default function Home() {
  const[itemName,setItemName]=useState('');
  const [open,setOpen]=useState(false);
  const [inventory,setInventory]=useState([]);

  const updateInventory = async()=>{
    const snapshot= query(collection(firestore,'inventory'));
    const docs=await getDocs(snapshot);
    const inventoryList=[];
    docs.forEach((doc)=>{
      inventoryList.push({
        name:doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList);
    
  }

  const removeitem=async (item)=>{
    const docRef=doc(collection(firestore,'inventory'),item)
    const docSnap=await getDoc(docRef)

    if(docSnap.exists()){
      const {quantity}=docSnap.data();
      if(quantity===1){
        await deleteDoc(docRef);
      }
      else {
        await setDoc(docRef,{quantity:quantity-1});
      }
    }
    await updateInventory()
  }

  const additem=async (item)=>{
    const docRef=doc(collection(firestore,'inventory'),item)
    const docSnap=await getDoc(docRef)

    if(docSnap.exists()){
      const {quantity}=docSnap.data();
        await setDoc(docRef,{quantity:quantity+1});
       }
       else{
        await setDoc(docRef,{quantity: 1});
       }
       await updateInventory()
    }
  

  useEffect(()=>{
    updateInventory();
    console.log("hello");
  },[])

  const handleOpen=()=> setOpen(true);
  const handleClose = ()=>setOpen(false)



  return (
    <Box
    width="100vw"
    height="100vh"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    gap={3}
    sx={{ bgcolor: '#f0f4f8', fontFamily: 'Arial, sans-serif', letterSpacing: '2px', fontWeight: '500' }}
  >
    <Modal open={open} onClose={handleClose}>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        width="400px"
        bgcolor="#ffffff"
        border="2px solid #e0e0e0"
        boxShadow={24}
        p={4}
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{ transform: 'translate(-50%, -50%)', borderRadius: '8px' }}
      >
        <Typography variant="h6" color="#333" letterSpacing="0.5px">
          Add Item
        </Typography>
        <Stack width="100%" direction="row" spacing={2}>
          <TextField
            required
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            sx={{ fontFamily: 'Arial, sans-serif' }}
          />
          <Button
            variant="contained"
            onClick={() => {
              additem(itemName);
              setItemName('');
              handleClose();
            }}
            sx={{ bgcolor: '#007bff', color: '#fff', '&:hover': { bgcolor: '#0056b3' } }}
          >
            Add
          </Button>
        </Stack>
      </Box>
    </Modal>
    <Button
      variant="contained"
      onClick={handleOpen}
      sx={{ bgcolor: '#28a745', color: '#fff', '&:hover': { bgcolor: '#218838' }, letterSpacing: '0.5px' }}
    >
      Add New Item
    </Button>
    <Box border="1px solid #e0e0e0" borderRadius="8px">
      <Box
        width="800px"
        height="100px"
        bgcolor="#007bff"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="8px 8px 0 0"
      >
        <Typography variant="h4" color="#ffffff" letterSpacing="0.5px">
          Inventory Items
        </Typography>
      </Box>
      <Stack width="800px" height="300px" spacing={2} p={2} overflow="scroll">
        {inventory.map(({ name, quantity }) => (
          <Box
            key={name}
            width="100%"
            height="80px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            bgcolor="#f0f0f0"
            padding={3}
            borderRadius="4px"
            sx={{ '&:hover': { bgcolor: '#e0e0e0' } }}
          >
            <Typography variant="h5" color="#333" letterSpacing="1px">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant="h5" color="#333" letterSpacing="1px">
              {quantity}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                onClick={() => removeitem(name)}
                sx={{ bgcolor: '#dc3545', color: '#fff', '&:hover': { bgcolor: '#c82333' } }}
              >
                Remove
              </Button>
              <Button
                variant="contained"
                onClick={() => additem(name)}
                sx={{ bgcolor: '#007bff', color: '#fff', '&:hover': { bgcolor: '#0056b3' } }}
              >
                Add
              </Button>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  </Box>
  );
}
