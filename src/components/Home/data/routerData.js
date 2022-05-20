let routerData = [
  {
      "id": 10,
      "name": "用户管理",
      "path": "users",
      "children": [
          {
              "id": 11,
              "name": "用户列表",
              "path": "users",
              "children": [],
              "order": null
          }
      ],
      "order": 1
  },
  {
    "id": 20,
    "name": "数据管理",
    "path": "waste",
    "children": [
        {
            "id": 21,
            "name": "垃圾数据",
            "path": "waste",
            "children": [],
            "order": 1
        },
        {
          "id": 22,
          "name": "分类管理",
          "path": "waste/category",
          "children": [],
          "order": 2
        },
        {
          "id": 23,
          "name": "分类测试",
          "path": "waste/test",
          "children": [],
          "order": 3
        }

    ],
    "order": 2
  },
  {
    "id": 30,
    "name": "题库管理",
    "path": "question",
    "children": [
        {
            "id": 31,
            "name": "查看题库",
            "path": "question",
            "children": [],
            "order": 1
        },
        {
          "id": 32,
          "name": "添加题目",
          "path": "question/add",
          "children": [],
          "order": 2
        }
    ],
    "order": 3
  },
  {
    "id": 40,
    "name": "文章管理",
    "path": "article",
    "children": [
        {
            "id": 41,
            "name": "查看文章",
            "path": "article",
            "children": [],
            "order": 1
        },
        {
          "id": 42,
          "name": "发布文章",
          "path": "article/add",
          "children": [],
          "order": 2
        },
        {
          "id": 43,
          "name": "分类管理",
          "path": "article/category",
          "children": [],
          "order": 3
        }
    ],
    "order": 4
  },
  {
    "id": 50,
    "name": "数据统计",
    "path": "chart",
    "children": [
        {
            "id": 51,
            "name": "查看图表",
            "path": "chart",
            "children": [],
            "order": null
        }
    ],
    "order": 5
  }
]

export {routerData}