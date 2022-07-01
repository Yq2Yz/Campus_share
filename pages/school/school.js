
var cityData = [
  {
  "name":"武夷学院",
  "code":"110000",
  "sub": [
    {
      "name": "数学与计算机学院",
      "code": "110100",
      "sub":[
          {
            "name":"计算机科学与技术",
            "code":"110101"
          },
          {
            "name":"物联网",
            "code":"110102"
          },
          {
            "name":"通信工程",
            "code":"110103"
          },
          {
            "name":"数学与应用数学",
            "code":"110104"
          }
        
        ]
        },
   {
        "name": "人文与教师教育学院",
        "code": "110200",
        "sub":[
              {
                "name":"汉语言",
                "code":"110201"
              },
              {
                "name":"英语",
                "code":"110202"
              },
              {
                "name":"小教",
                "code":"110203"
              },
              {
                "name":"文言文",
                "code":"110204"
              }
            
            ]
            }

      ]
      },
  {

  "name":"武夷山职业技术学校",
  "code":"120000",
  "sub": [
          {
            "name": "餐旅系",
            "code": "120100",
            "sub":[
                {
                  "name":"餐饮服务与管理",
                  "code":"120101"
                },
                {
                  "name":"烹饪工艺与营养",
                  "code":"120102"
                },
                {
                  "name":"酒店管理",
                  "code":"120103"
                },
                {
                  "name":"导游专业",
                  "code":"120104"
                }
              ]
              },
          {
            "name": "茶学系",
            "code": "120200",
            "sub":[
                {
                  "name":"",
                  "code":"120201"
                },
                {
                  "name":"",
                  "code":"120202"
                },
                {
                  "name":"",
                  "code":"120203"
                },
                {
                  "name":"",
                  "code":"120204"
                }   
              ]
              },
              {
                "name": "园艺技术专业",
                "code": "120300",
                "sub":[
                    {
                      "name":"",
                      "code":"120301"
                    },
                    {
                      "name":"",
                      "code":"120302"
                    },
                    {
                      "name":"",
                      "code":"120303"
                    },
                    {
                      "name":"",
                      "code":"120304"
                    }   
                  ]
                  },
            {
              "name": "茶叶生产与加工技术",
              "code": "120400",
              "sub":[
                   {

                   }
              ]
            },
            {
              "name": "园林技术",
              "code": "120500",
              "sub":[
                   {

                   }
              ]
            },

            ]
            }

];

function init(that){
  that.setData( { 
        'cityData': cityData
    });
}

module.exports={
    init:init
}