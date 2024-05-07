import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../components/Post";
import LayoutDefault from "../layout/LayoutDefault";
import { client } from "../util/createClient";

function PageNotFound() {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [feedbackPosts, setFeedbackPosts] = useState('Carregando posts...');
    const [feedbackCategories, setFeedbackCategories] = useState('Carregando categorias...')
    const getPosts = async () => {
        try {
            const response = await client.getEntries({
                content_type: 'fiapBlogPost',
                limit: 2,
                order: "-sys.createdAt"
            });
    
            setPosts(response.items);
        } catch (error) {
            setFeedbackPosts('Erro ao carregar os posts, run to the hills!');
        }
    };

    const getCategories = async () => {
        try {
            const response = await client.getEntries({
                content_type: 'fiapBlogCategory',
            });
    
            setCategories(response.items);
        } catch (error) {
            setFeedbackCategories('Erro ao carregar categorias, run to the hills!');
        }
    };



    useEffect(() => {
        getPosts();
        getCategories();
    }, []);

    return (
        <LayoutDefault>
            <div className="container">
                <div className="row">
                    <main className="col-md-8">
                        <h2 className="my-3">Área dos posts</h2>

                        {posts.length === 0 && (
                            <p>{feedbackPosts}</p>
                        )}

                        {posts.map((post) => (
                            <Post
                                key={post.sys.id}
                                title={post.fields.title}
                                description={post.fields.description}
                                slug={post.fields.slug}
                            />
                        ))}

                        <Link to="/posts" className="btn btn-primary">
                            Ver todos os posts
                        </Link>
                    </main>
                    <aside className="col-md-4">
                        <h2 className="my-3">Categorias</h2>

                        {categories.length === 0 && (
                            <p>{feedbackCategories}</p>
                        )}

                        <ul>
                        {categories.map((category) => (
                              <li key={category.sys.id}>{category.fields.categoryTitle}</li>
                        ))}
                          
                        </ul>
                    </aside>
                </div>
            </div>
        </LayoutDefault>
    )
}

export default PageNotFound;