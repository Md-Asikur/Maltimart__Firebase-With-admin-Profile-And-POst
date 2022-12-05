import { async } from '@firebase/util';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Col, Container, Form, FormGroup, Row } from 'reactstrap'
import { db, storage } from '../firebase.config';

const AddProducts = () => {
  const navigate=useNavigate()
  const [enterTitle, setEnterTitle] = useState("")
  const [enterShortDesc, setEntershortDesc] = useState("");
   const [enterDesc, setEnterDesc] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading,setLoading]=useState(false)
  const addProductSubmit =async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Add product Firebase
    try {
      const docRef = await collection(db, "products")
      const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`)
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg)
      uploadTask.on(() => {
        toast.error("Image Not Uploded")
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
          await addDoc(docRef, {
           title: enterTitle,
            shortDesc: enterShortDesc,
            description: enterDesc,
            category: enterCategory,
            price: enterPrice,
            imgUrl:downloadUrl,
          });
        })
       
      })
      setLoading(false);
      toast.success("Product Created Successfully!");
      navigate("/dashboard/all-products")
      
    } catch (err) {
      setLoading(false);
      toast.error(err.message)
    }
    
  }
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {loading ? (
              <h4 className='fw-bold text-center'>Loading...</h4>
            ) : (
              <>
                <h4 className="mb-5">Add Products</h4>
                <Form onSubmit={addProductSubmit}>
                  <FormGroup className="form__group">
                    <span>Product Title</span>
                    <input
                      type="text"
                      value={enterTitle}
                      onChange={(e) => setEnterTitle(e.target.value)}
                      placeholder="double sofa..."
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span>Short Description</span>
                    <input
                      type="text"
                      value={enterShortDesc}
                      onChange={(e) => setEntershortDesc(e.target.value)}
                      placeholder="short desc..."
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span>Description</span>
                    <input
                      type="text"
                      value={enterDesc}
                      onChange={(e) => setEnterDesc(e.target.value)}
                      placeholder="description..."
                      required
                    />
                  </FormGroup>
                  <div className="d-flex align-items-center justify-content-between gap-5">
                    <FormGroup className="form__group w-50">
                      <span>Price</span>
                      <input
                        type="number"
                        value={enterPrice}
                        onChange={(e) => setEnterPrice(e.target.value)}
                        placeholder="$200"
                        required
                      />
                    </FormGroup>
                    <FormGroup className="form__group w-50">
                      <span>Category</span>
                      <select
                        className="w-100 p-2"
                        value={enterCategory}
                        onChange={(e) => setEnterCategory(e.target.value)}
                        required
                        >
                          <option >Select Category</option>
                        <option value="chair">Chair</option>
                        <option value="sofa">Sofa</option>
                        <option value="mobile">Mobile</option>
                        <option value="watch">Watch</option>
                        <option value="wireless">Wireless</option>
                      </select>
                    </FormGroup>
                  </div>

                  <div>
                    <FormGroup className="form__group">
                      <span>Product Image</span>
                      <input
                        type="file"
                        onChange={(e) => setEnterProductImg(e.target.files[0])}
                        required
                      />
                    </FormGroup>
                  </div>
                  <button type="submit" className="buy__btn">
                    Add Product
                  </button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default AddProducts