export default ({ title, desc, imgBackground }) => (
    <div class="jumbotron p-3 p-md-5 text-white rounded " style={{ backgroundImage: `url(${imgBackground})` }}>
        <div class="col-md-6 px-0">
        <h1 class="display-4 font-italic">{title}</h1>
        <p class="lead my-3">{desc}</p>
        <p class="lead mb-0"><a href="#" class="text-white font-weight-bold">Continue reading...</a></p>
        </div>
    </div>
);