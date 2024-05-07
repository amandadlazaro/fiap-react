import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Post from "../components/Post";
import LayoutDefault from "../layout/LayoutDefault";
import { client } from "../util/createClient";
function PageAllPosts() {
    const [posts, setPosts] = useState([]);
    const [total, setTotal] = useState([]);
    const limit = 3;
    const [feedbackPosts, setFeedbackPosts] = useState('Carregando posts...');
    const getAllPosts = async (page) => {
        try {
            const response = await client.getEntries({
                content_type: 'fiapBlogPost',
                limit: limit,
                skip: page,
                order: "-sys.createdAt"
            });

            setPosts(response.items);
            setTotal(Array.from({ length: (response.total / limit).toFixed(0) }, (x, i) => i + 1));
        } catch (error) {
            setFeedbackPosts('Erro ao carregar os posts, run to the hills!');
        }
    };

    const filter = (page) => {
        getAllPosts(page * limit);
    }



    useEffect(() => {
        getAllPosts(0);
    }, []);

    return (
        <LayoutDefault>
            <div className="container">
                <div className="row">
                    <main className="col-md-8">
                        <h2 className="my-3">Todos os posts</h2>

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

                        <nav aria-label="...">
                            <ul className="pagination pagination-lg">
                                {total.map((page) => (

                                    <li className="page-item">
                                        <a className="page-link" onClick={() => { filter(page - 1); }}>{page}</a>
                                    </li>
                                ))}

                            </ul>
                        </nav>


                        <Link to="/" className="btn btn-primary">
                            Voltar
                        </Link>
                    </main>

                </div>
            </div>
        </LayoutDefault>
    )
}

export default PageAllPosts;