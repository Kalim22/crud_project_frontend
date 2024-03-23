import React, { useEffect, useState } from 'react'
import { Button, useDisclosure } from '@chakra-ui/react'
import OverlayModal from '../components/Modal'
import Headers from '../components/Headers'
import Loader from '../components/Loader'
import InputField from '../components/InputField'
import TableHeader from '../components/TableHeader'
import TableBody from '../components/TableBody'

type bodyData = {
    name: string,
    quantity: number,
    price: number
}

type productType = {
    productId: string,
    productName?: string,
    productPrice?: number,
    productQuantity?: number
}

const Home: React.FC = () => {

    // states
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { isOpen: isEditOpen, onClose: onEditClose, onOpen: onEditOpen } = useDisclosure()
    const { isOpen: isDeleteOpen, onClose: onDeleteClose, onOpen: onDeleteOpen } = useDisclosure()
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedProduct, setSelectedProduct] = useState<productType>({
        productId: '',
        productName: '',
        productPrice: 0,
        productQuantity: 0
    })

    const [text, setText] = useState<bodyData>({
        name: '',
        price: 0,
        quantity: 0
    })

    const { name, price, quantity } = text

    // onchange function for input
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText({ ...text, [event.target.name]: event.target.value })
    }


    // get api for all products
    const fetchAllProducts = async (): Promise<any> => {
        try {
            setLoading(true)
            const res = await fetch("http://localhost:8000/apiv1/get-all-products/", {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const data = await res.json()
            setLoading(false)
            return setProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }

    // post api for adding product item
    const fetchAddProduct = async (event: React.FormEvent): Promise<any> => {
        event.preventDefault()
        try {
            setLoading(true)
            let date = new Date()
            const userValue = JSON.parse(localStorage.getItem('crudauth') || '""')
            const res = await fetch("http://localhost:8000/apiv1/add-new-product/", {
                method: 'POST',
                headers: {
                    "Content-type": 'application/json'
                },
                body: JSON.stringify({
                    "name": name,
                    "price": price,
                    "quantity": quantity,
                    "createdBy": `${userValue?.firstName} ${userValue?.lastName}`,
                    createdOn: date.toLocaleString()
                })
            })
            const data = await res.json()
            setLoading(false)
            if (data?.status === true) {
                setText({
                    name: "",
                    price: 0,
                    quantity: 0,

                })
                onClose()
                return fetchAllProducts()
            }
            return alert(data?.error)
        } catch (error) {
            console.log(error)
        }
    }

    // delete api for deleting single product item
    const handleDelete = async (e: React.FormEvent, id: string): Promise<any> => {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await fetch(`http://localhost:8000/apiv1/delete-product?id=${id}`, {
                method: "DELETE",
                redirect: "follow"
            })
            await res.json()
            setLoading(false)
            onDeleteClose()
            return fetchAllProducts()
        } catch (error) {
            console.log(error)
        }
    }

    // edit api for updating single item form product
    const handleEdit = async (e: React.FormEvent, id: string): Promise<any> => {
        e.preventDefault()
        try {
            setLoading(true)
            const raw = JSON.stringify({
                "quantity": quantity !== 0 ? quantity : selectedProduct?.productQuantity,
                "price": price !== 0 ? price : selectedProduct?.productPrice
            });


            const res = await fetch(`http://localhost:8000/apiv1/edit-product/?id=${id}`, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json'
                },
                redirect: "follow",
                body: raw
            })
            await res.json()
            setLoading(false)
            onEditClose()
            setText({
                name: '',
                price: 0,
                quantity: 0
            })
            return fetchAllProducts()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        (async () => {
            await fetchAllProducts()
        })()
    }, [])

    if (loading) {
        return <Loader />
    }

    return (
        <section className='container__full' style={{ justifyContent: 'flex-start', alignItems: 'center' }}>

            {/* Header */}
            <Headers onOpen={onOpen} primaryButtonText='Add Item'/>
            {/* Table */}
            <TableHeader
                title='Product Name'
                secondTableHeading='Price'
                thirdTableHeading='Quantity'
                fourthTableHeading='Created BY'
                fiveTableHeading='Created On'
                buttonTitle='Action'
            >
                {
                    products?.map((ele, idx) => {
                        return (
                            <TableBody
                                key={idx}
                                background={idx % 2 === 0 ? '#fafafa' : ''}
                                sno={idx + 1}
                                price={ele?.price}
                                quantity={ele?.quantity}
                                createdby={ele?.createdBy}
                                createdon={ele?.createdOn?.toString()?.split(',')[0]}
                                productTitle={ele?.name}
                                button={
                                    <>
                                        <Button _hover={{ background: 'blue.500', color: 'white' }} onClick={() => {
                                            setSelectedProduct({
                                                productId: ele?._id,
                                                productName: ele?.name,
                                                productPrice: ele?.price,
                                                productQuantity: ele?.quantity
                                            })
                                            onEditOpen()
                                        }} marginRight={4}>Edit</Button>
                                        <Button _hover={{ background: 'red.500', color: 'white' }} onClick={() => {
                                            onDeleteOpen()
                                            setSelectedProduct({ productId: ele?._id })
                                        }} color="black">Delete</Button>
                                    </>}
                            />
                        )
                    })
                }
            </TableHeader>

            {/* Modal For Add Item */}
            <OverlayModal isOpen={isOpen} onClose={onClose} onSubmit={fetchAddProduct} modalTitle='Add Product To Your List' primaryButtonText='Add Item'>
                <InputField name='name' type="text" value={name} placeholder="Product Title" onChange={handleChange} required={true}/>
                <InputField name='price' type="number" value={price === 0 ? 'Price' : price} placeholder={'Price'} onChange={handleChange} required={true}/>
                <InputField name='quantity' type="number" value={quantity === 0 ? 'Quantity' : quantity} placeholder='Quantity' onChange={handleChange} required={true}/>
            </OverlayModal>

            {/* Pop up modal for edit product */}
            <OverlayModal isOpen={isEditOpen} onClose={onEditClose} onSubmit={(e: React.FormEvent) => handleEdit(e, selectedProduct?.productId)} modalTitle='Edit Your Product' primaryButtonText='Save'>
                <InputField name='name' type="text" value={selectedProduct?.productName} placeholder="Product Title" onChange={handleChange} disabled={true} />
                <InputField name='price' type="number" value={price === 0 ? 'Price' : price} placeholder='Price' onChange={handleChange} required={false} />
                <InputField name='quantity' type="number" value={quantity === 0 ? 'Quantity' : quantity} placeholder='Quantity' onChange={handleChange} required={false} />
            </OverlayModal>

            {/* Pop up modal delete product */}
            <OverlayModal isOpen={isDeleteOpen} onClose={onDeleteClose} onSubmit={(e: React.FormEvent) => handleDelete(e, selectedProduct?.productId)} modalTitle='Are your sure want to delete?' primaryButtonText='Delete'>
            </OverlayModal>

        </section>
    )
}

export default Home