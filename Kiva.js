$(document).ready(function() {
    $('#myContainer').fullpage({
        sectionsColor: ['#ff73a1', '#4BBFC3', '#7BAABE', '#4BBFC3', '#ff73a1', '#ff73a1'],
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage','5thPage'],
        //menu: '#menu',
        slidesNavigation: true,
        scrollHorizontally: true,
        scrollBar: true,
        fixedElements: '#header, .footer',
        scrollHorizontallyKey: 'YWx2YXJvdHJpZ28uY29tX01mU2MyTnliMnhzU0c5eWFYcHZiblJoYkd4NVNRcg==',
        afterRender: function(){
            var pluginContainer = this;
            console.log("The resulting DOM structure is ready");
        },
        afterLoad: function(origin, destination, direction){
            console.log("afterLoad--" + "anchorLink: " + destination + " index: " + destination.index);
            
            switch (destination.index) {
                case 0:
                    //No action    
                    break;
                case 1:
                    
                    

                    break;
                case 2:
                    //Loaded for the first time when loaded from section 3
                    drawChart3_1();
                    break;
                case 3:
                    //Loaded for the first time when loaded from section 4
                    drawChart4_1();
                    break;
                default:
                    break;
            }
            if(destination.index == 0) {

            }
            //using index
            if(origin != null && origin.index == 2){
                //alert("Section 3 ended loading");
            }

            //using anchorLink
            if(origin != null && origin.anchor == 'secondSlide'){
                //alert("Section 2 ended loading");
            }
        },
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
            console.log("slideLoad--" + "anchorLink: " + anchorLink + " index: " + index + " slideAnchor: " + slideAnchor + " slideIndex: " + slideIndex);
            
            //anchorLink: Page or Section
            //slideAnchor: Destination slide Index
            switch (anchorLink.anchor) {
                case "firstPage":
                    switch (slideAnchor.index) {
                        case 0:
                            
                            break;
                        case 1:
                            
                            break;
                        case 2:
                            break;
                        default:
                            break;
                    }
                    break;
                case "secondPage":

                case "3rdPage":

                    switch (slideAnchor.index) {
                        case 0:
                            drawChart3_1();
                            break;
                        case 1:
                            drawChart3_2();
                            break;
                        case 2:
                            drawChart3_3();
                            break;
                        default:
                            break;
                    }
                    case "4thPage":

                        switch (slideAnchor.index) {
                            case 0:
                                drawChart4_1();
                                break;
                            case 1:
                                drawChart4_2();
                                break;
                            case 2:
                                //drawChart4_3();
                                break;
                            default:
                                break;
                        }
                default:
                    break;
            }

            //3rd Page Index 2 = 3.2
            if(anchorLink.anchor == "3rdPage") {

                if(anchorLink.index == 2) {

                }
            }

            
        var fpcell = document.getElementsByClassName("fp-tableCell");

        for (index = 0; index < fpcell.length; ++index) {
                fpcell[index].style.verticalAlign = "top";
                //console.log(fpcell[index]);
            }

        },
        onSlideLeave: function(anchorLink, index, slideIndex, direction){
            console.log("----------------");
            console.log("onSlideLeave--" + "anchorLink: " + anchorLink + " index: " + index + " slideIndex: " + slideIndex + " direction: " + direction);
        }
    });
});