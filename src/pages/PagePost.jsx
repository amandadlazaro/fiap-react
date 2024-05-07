import { useState } from "react";
import LayoutDefault from "../layout/LayoutDefault";
import { client } from "../util/createClient";
import { useEffect } from "react";
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Link, useParams } from "react-router-dom";

function PagePost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();

    const getPost = async () => {
        try {
            const response = await client.getEntries({
                content_type: 'fiapBlogPost',
                'fields.slug': slug
            });
            setPost(response.items[0] || null)
        } catch (erro) {
        }
    }
    useEffect(() => {
        getPost();
    }, []);

    return (
        <LayoutDefault>
            <div className="container">
                <div className="row">
                    <main className="col">

                        <div className="my-4">
                            {post && (
                                <>
                                    <h2>{post.fields.title}</h2>
                                    <p>{post.fields.description}</p>
                                    <div dangerouslySetInnerHTML={{ __html: documentToHtmlString(post.fields.content) }}></div>
                                </>
                            )}
                            <Link to="/" class="btn btn-primary">Voltar</Link>
                        </div>

                    </main>
                </div>
            </div>
        </LayoutDefault>
    );
}

export default PagePost;