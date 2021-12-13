import { createClient } from 'pexels';
import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { key } from '../../key.json';

const client = createClient(key)
const query = "blue"

function Gallery() {

    const [page, setPage] = useState(1)
    const [image, setImage] = useState([])
    const [cols, setCols] = useState([3])

    async function loadData() {

        client.photos.search({ query, per_page: 60, page: page }).then(result => {
            result.photos.map((curr) => {
                setImage((image) => ([...image, {
                    img: curr.src.portrait,
                    author: curr.photographer,
                    link: curr.url
                }]))
            })
        })
    }

    async function adjustCols() {
        const size = window.innerWidth

        if (size >= 1200) setCols(5)        // lg
        else if (size >= 992) setCols(4)    // md
        else if (size >= 768) setCols(3)    // sm
        else setCols(2)                     // xs

        console.log(cols)
    }

    useEffect(() => adjustCols(), [window.innerWidth])
    useEffect(() => loadData(), [page])

    const chunkArray = (arr, size) => {
        const chunks = []
        for (let i = 0; i < size; i++) {
            chunks.push([])
        }
        for (let i = 0; i < arr.length; i++) {
            chunks[i % size].push(arr[i])
        }
        return chunks
    }

    return (
        <Container>
            <div className="imgRow" >
                {chunkArray(image, cols).map((chunk) => {
                    return (
                        <div className="imgColumn" >
                            {chunk.map(({ img, author, link }) => (
                                <a href={link} target="_blank" className="imgDisplay">
                                    <img src={img} />
                                    <div className="insetShadow" />
                                    <span> by: {author} </span>
                                </a>
                            ))}
                        </div>
                    );
                })}
            </div>
            <Button onClick={() => setPage(page + 1)} variant="outline-primary" size="lg"> Ver mais </Button>
        </Container>)
}

export default Gallery