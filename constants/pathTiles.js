import dimensions from "./dimensions";

const { tileDimension, centerSquareDimension, squareDimension } = dimensions;
export const outerPathTiles = [

    // tiles between Red and Green  
    {left: 5*tileDimension, top: squareDimension + 2*tileDimension },
    {left: 4*tileDimension, top: squareDimension + 2*tileDimension },
    {left: 3*tileDimension, top: squareDimension + 2*tileDimension },
    {left: 2*tileDimension, top: squareDimension + 2*tileDimension, isSafePoint: true },
    {left: tileDimension, top: squareDimension + 2*tileDimension },
    {left: 0, top: squareDimension + 2*tileDimension },

    {left: 0, top: squareDimension + tileDimension },
    
    {left: 0, top: squareDimension},
    {left: tileDimension, top: squareDimension, backgroundColor: "green"},
    {left: 2*tileDimension, top: squareDimension},
    {left: 3*tileDimension, top: squareDimension },
    {left: 4*tileDimension, top: squareDimension },
    {left: 5*tileDimension, top: squareDimension },

    // tiles between Green and Blue
    {left: squareDimension, top: 5*tileDimension},
    {left: squareDimension, top: 4*tileDimension},
    {left: squareDimension, top: 3*tileDimension},
    {left: squareDimension, top: 2*tileDimension, isSafePoint: true},
    {left: squareDimension, top: tileDimension},
    {left: squareDimension, top: 0 },
   
    {left: squareDimension + tileDimension, top: 0},
    
    {left: squareDimension + 2*tileDimension, top: 0},
    {left: squareDimension + 2*tileDimension, top: tileDimension, backgroundColor: "blue"},
    {left: squareDimension + 2*tileDimension, top: 2*tileDimension},
    {left: squareDimension + 2*tileDimension, top: 3*tileDimension},
    {left: squareDimension + 2*tileDimension, top: 4*tileDimension},
    {left: squareDimension + 2*tileDimension, top: 5*tileDimension},

    // tiles between Blue and Yellow
    {left: squareDimension + centerSquareDimension, top: squareDimension},
    {left: squareDimension + centerSquareDimension + tileDimension, top: squareDimension},
    {left: squareDimension + centerSquareDimension + 2*tileDimension, top: squareDimension},
    {left: squareDimension + centerSquareDimension + 3*tileDimension, top: squareDimension, isSafePoint: true},
    {left: squareDimension + centerSquareDimension + 4*tileDimension, top: squareDimension},
    {left: squareDimension + centerSquareDimension + 5*tileDimension, top: squareDimension},

    {left: squareDimension + centerSquareDimension + 5*tileDimension, top: squareDimension + tileDimension},

    {left: squareDimension + centerSquareDimension + 5*tileDimension, top: squareDimension + 2*tileDimension},
    {left: squareDimension + centerSquareDimension + 4*tileDimension, top: squareDimension + 2*tileDimension, backgroundColor: "yellow"},
    {left: squareDimension + centerSquareDimension + 3*tileDimension, top: squareDimension + 2*tileDimension},
    {left: squareDimension + centerSquareDimension + 2*tileDimension, top: squareDimension + 2*tileDimension},
    {left: squareDimension + centerSquareDimension + tileDimension, top: squareDimension + 2*tileDimension},
    {left: squareDimension + centerSquareDimension, top: squareDimension + 2*tileDimension},
    
    // tiles between Yellow and Red
    {left: squareDimension + 2*tileDimension, top: squareDimension + centerSquareDimension},
    {left: squareDimension + 2*tileDimension, top: squareDimension + centerSquareDimension + tileDimension},
    {left: squareDimension + 2*tileDimension, top: squareDimension + centerSquareDimension + 2*tileDimension},
    {left: squareDimension + 2*tileDimension, top: squareDimension + centerSquareDimension + 3*tileDimension, isSafePoint: true},
    {left: squareDimension + 2*tileDimension, top: squareDimension + centerSquareDimension + 4*tileDimension},
    {left: squareDimension + 2*tileDimension, top: squareDimension + centerSquareDimension + 5*tileDimension},

    {left: squareDimension + tileDimension, top: squareDimension + centerSquareDimension + 5*tileDimension},

    {left: squareDimension, top: squareDimension + centerSquareDimension + 5*tileDimension},
    {left: squareDimension, top: squareDimension + centerSquareDimension + 4*tileDimension, backgroundColor: "red"},
    {left: squareDimension, top: squareDimension + centerSquareDimension + 3*tileDimension},
    {left: squareDimension, top: squareDimension + centerSquareDimension + 2*tileDimension},
    {left: squareDimension, top: squareDimension + centerSquareDimension + tileDimension},
    {left: squareDimension, top: squareDimension + centerSquareDimension}
];

export const innerPathTiles = [

    {left: squareDimension + tileDimension, top: squareDimension + centerSquareDimension + 4*tileDimension, backgroundColor: "red"},
    {left: squareDimension + tileDimension, top: squareDimension + centerSquareDimension + 3*tileDimension, backgroundColor: "red"},
    {left: squareDimension + tileDimension, top: squareDimension + centerSquareDimension + 2*tileDimension, backgroundColor: "red"},
    {left: squareDimension + tileDimension, top: squareDimension + centerSquareDimension + tileDimension, backgroundColor: "red"},
    {left: squareDimension + tileDimension, top: squareDimension + centerSquareDimension, backgroundColor: "red"},
    
    {left: tileDimension, top: squareDimension + tileDimension, backgroundColor: "green"},
    {left: 2*tileDimension, top: squareDimension + tileDimension, backgroundColor: "green"},
    {left: 3*tileDimension, top: squareDimension + tileDimension, backgroundColor: "green"},
    {left: 4*tileDimension, top: squareDimension + tileDimension, backgroundColor: "green"},
    {left: 5*tileDimension, top: squareDimension + tileDimension, backgroundColor: "green"},

    {left: squareDimension + tileDimension, top: tileDimension, backgroundColor: "blue"},
    {left: squareDimension + tileDimension, top: 2*tileDimension, backgroundColor: "blue"},
    {left: squareDimension + tileDimension, top: 3*tileDimension, backgroundColor: "blue"},
    {left: squareDimension + tileDimension, top: 4*tileDimension, backgroundColor: "blue"},
    {left: squareDimension + tileDimension, top: 5*tileDimension, backgroundColor: "blue"},

    {left: squareDimension + centerSquareDimension + 4*tileDimension, top: squareDimension + tileDimension, backgroundColor: "yellow"},
    {left: squareDimension + centerSquareDimension + 3*tileDimension, top: squareDimension + tileDimension, backgroundColor: "yellow"},
    {left: squareDimension + centerSquareDimension + 2*tileDimension, top: squareDimension + tileDimension, backgroundColor: "yellow"},
    {left: squareDimension + centerSquareDimension + tileDimension, top: squareDimension + tileDimension, backgroundColor: "yellow"},
    {left: squareDimension + centerSquareDimension, top: squareDimension + tileDimension, backgroundColor: "yellow"}   

];
