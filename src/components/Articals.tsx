import { Grid, Link } from '@mui/material';
import Typography from '../components/Typography';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import Loading from './Loading';

interface ArticleDataType {
    id: number;
    source: {
        id: null | string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
}

const Articals = () => {
    const [loading, setLoading] = useState(false);
    const [articleData, setArticleData] = useState<ArticleDataType[]>([]);

    const fetchListOfArticles = async () => {
        setLoading(true);
        try {
            const randomWords = ['apple', 'tesla'];
            const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];

            const response = await axios.get(`http://localhost:3000/all_articles?q=${randomWord}`);
            setArticleData(response.data.articles);
        } catch (error) {
            console.error(error);
            toast.error('Error fetching articles');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListOfArticles();
    }, []);

    const handleImageClick = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <nav className="fixed-navbar">
                        <Link href="/Home">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3772/3772209.png"
                                className="nav--icon"
                                alt="Learn Now Logo"
                            />
                        </Link>
                        <h3 className="nav--logo_text">GoLinkIn</h3>
                    </nav>
                    <div style={{ backgroundColor: 'black', height: '100%', marginTop: '3%' }}>
                        <br /><br /><br />
                        <Typography variant="h3" gutterBottom style={{color:'#04d9ff', marginLeft:'50px'}}>
                        Explore Latest Articles
                    </Typography>
                        <Grid container justifyContent="center" spacing={10}>
                            {articleData.map((item) => (
                                <Grid key={item.id} item xs={12} md={9} container>
                                    <Grid item xs={12} md={6} onClick={() => handleImageClick(item.url)}>
                                        <div className='artical-card' style={{  cursor: 'pointer' }}>
                                            <img
                                                src={item.urlToImage}
                                                alt={item.title}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                    <Typography variant="h5" style={{ color: '#fff', marginLeft: '-150px', marginRight: '-200px' }}>
                                            {item.title}
                                        </Typography>
                                        <br />
                                        <Typography variant="body1" style={{ color: '#fff', marginLeft: '-150px' }}>{item.description}</Typography>
                                        <Typography variant="body1" style={{ color: 'gray', marginLeft: '-150px' }}>{item.publishedAt}</Typography>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </div>

                </div>
            )}
        </>
    );
};

export default Articals;
