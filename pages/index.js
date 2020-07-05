import React from 'react';
import Layout from '@layout';
import Navbar from '@components/Navbar';
import Banner from '@components/Banner';
import Card from '@components/Card';
import axios from 'axios';
import {initNotificationSW, unregNotificationSW } from '@libs/notification'

class HomePage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }
    async componentDidMount(){
        initNotificationSW();
        this.getArticle();
      }
    
    componentWillUnmount() {
        unregNotificationSW()
    }

    getArticle = () => {
        axios.get(`${process.env.API_URL}/article/all`)
            .then((resp) => {
                console.log('resp : ', resp.data);
                this.setState({
                    data: resp.data.data
                })
            });
    }
    
    render(){
        const { data } = this.state;
        return (
            <Layout>
                <Navbar />
    
                <Banner
                    imgBackground="https://www.suzuki.co.id/themes/default2019/img/hero-news.jpg"
                    title="Berita Terbaru dari Suzuki"
                    desc="Kumpulan informasi terbaru dari Suzuki. Dari mulai press release hingga informasi terkini tentang pameran dan event dari Suzuki ada disini."
                />
    
                <h1 style={{ textAlign: 'center', margin: '2em 0em 1em'}}>Blog</h1>
                {/* <div class="row mb-2">
                    <Card title="Featured post" tag="World" desc="This is a wider card with supporting text below as a natural lead-in to additional content." />
                    <Card color="success" title="Design" tag="World" desc="This is a wider card with supporting text below as a natural lead-in to additional content." />
                    
                </div> */}
    
                <div class="row mb-2">
                    { data.length > 0 && data.map((item, key) => (
                        <Card
                            key={key}
                            title={item.title || ''}
                            tag={item.topic || ''}
                            desc={item.body|| ''}
                        />
                    ))}
                    {/* <Card title="Featured post" tag="World" desc="This is a wider card with supporting text below as a natural lead-in to additional content." />
                    <Card color="success" title="Design" tag="World" desc="This is a wider card with supporting text below as a natural lead-in to additional content." /> */}
                    
                </div>
    
    
                <main role="main" class="container mt-5">
                <div class="row">
                    <div class="col-md-8 blog-main">
                    <h3 class="pb-3 mb-4 font-italic border-bottom">
                        From the Firehose
                    </h3>
    
                    <div class="blog-post">
                        <h2 class="blog-post-title">Another blog post</h2>
                        <p class="blog-post-meta">December 23, 2013 by <a href="#">Jacob</a></p>
    
                        <p>Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
                        <blockquote>
                        <p>Curabitur blandit tempus porttitor. <strong>Nullam quis risus eget urna mollis</strong> ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                        </blockquote>
                        <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
                        <p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                    </div>
    
                    <div class="blog-post">
                        <h2 class="blog-post-title">New feature</h2>
                        <p class="blog-post-meta">December 14, 2013 by <a href="#">Chris</a></p>
    
                        <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                        <ul>
                        <li>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</li>
                        <li>Donec id elit non mi porta gravida at eget metus.</li>
                        <li>Nulla vitae elit libero, a pharetra augue.</li>
                        </ul>
                        <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
                        <p>Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.</p>
                    </div>
    
                    <nav class="blog-pagination">
                        <a class="btn btn-outline-primary" href="#">Older</a>
                        <a class="btn btn-outline-secondary disabled" href="#">Newer</a>
                    </nav>
    
                    </div>
    
                    <aside class="col-md-4 blog-sidebar">
                    <div class="p-3 mb-3 bg-light rounded">
                        <h4 class="font-italic">About</h4>
                        <p class="mb-0">Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
                    </div>
    
                    <div class="p-3">
                        <h4 class="font-italic">Archives</h4>
                        <ol class="list-unstyled mb-0">
                        <li><a href="#">March 2014</a></li>
                        <li><a href="#">February 2014</a></li>
                        <li><a href="#">January 2014</a></li>
                        <li><a href="#">December 2013</a></li>
                        <li><a href="#">November 2013</a></li>
                        <li><a href="#">October 2013</a></li>
                        <li><a href="#">September 2013</a></li>
                        <li><a href="#">August 2013</a></li>
                        <li><a href="#">July 2013</a></li>
                        <li><a href="#">June 2013</a></li>
                        <li><a href="#">May 2013</a></li>
                        <li><a href="#">April 2013</a></li>
                        </ol>
                    </div>
    
                    <div class="p-3">
                        <h4 class="font-italic">Elsewhere</h4>
                        <ol class="list-unstyled">
                        <li><a href="#">GitHub</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">Facebook</a></li>
                        </ol>
                    </div>
                    </aside>
    
                </div>
    
                </main>
            </Layout>
        )
    }
    // return <div>Suzuki Prototype</div>
  }
  
  export default HomePage