//import { key } from '../../key.json'
import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';

//const client = createClient(key)

function Gallery() {

    const [page, setPage] = useState(1)
    const [image, setImage] = useState([])

    async function loadData() {
        console.log(page)

        const h = Math.floor(Math.random() * (10 - 4 + 1) + 4) * 100
        const w = Math.floor(Math.random() * (10 - 4 + 1) + 4) * 100
        setImage((image) => ([...image, {
            img:
                `http://picsum.photos/${w}/${h}?${page}`,
            cols: 1,
            title: 'image',
        }]))
    }

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
            {console.log(chunkArray(image, 3))}
            <div className="imgRow">
                {chunkArray(image, 3).map((chunk) => {
                    return (
                        <div className="imgColumn">
                            {chunk.map(({ img }) => (
                                <img src={img} />
                            ))}
                        </div>
                    );
                })}
            </div>
            <Button onClick={() => setPage(page + 1)} variant="outline-primary" size="lg"> Ver mais </Button>
        </Container>)
}

export default Gallery