function loader(id_, href_){
    //let test = document.getElementById(id_);
//console.log(test);
    document.getElementById(id_).onclick = function() {
        //window.location.href = "./contact.html"; // Replace with the desired URL
        //window.location.href = href_;
        window.open(href_, "_blank");
    };
};

loader(id_ = "sub0", href_ ="./contact.html");
loader(id_ = "sub1", href_ ="./contact.html");
loader(id_ = "sub2", href_ ="./contact.html");

loader(id_ = "prod0", href_ ="./services.html");
loader(id_ = "prod1", href_ ="./services.html");
loader(id_ = "prod2", href_ ="./services.html");


