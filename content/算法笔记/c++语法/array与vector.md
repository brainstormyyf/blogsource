---
title: array与vector
linkTitle: array与vector
type: docs
nav_weight: 1
authors:
  - YYF
date: 2024-03-05T01:20:01+08:00
---
<!--more-->

在 C++ 中，`array` 和 `vector` 是两种常用的容器类型，用于存储和操作数据集合。它们分别替代了 C 语言中的静态数组和动态数组（通过 `malloc` 和 `realloc` 分配的数组）。
### C++ `array` 的使用
`array` 是 C++11 引入的，它是一个固定大小的容器，提供了比传统 C 数组更安全、更方便的操作。`array` 的使用需要包含 `<array>` 头文件。
**成员函数**:
- `size()`：返回数组的大小。
- `empty()`：检查数组是否为空。
- `front()`：返回数组的第一个元素。
- `back()`：返回数组的最后一个元素。
- `data()`：返回指向数组内部数据的指针。
**使用示例**:
```cpp
#include <iostream>
#include <array>
int main() {
    std::array<int, 5> arr = {1, 2, 3, 4, 5}; // 创建一个包含5个整数的array
    // 访问元素
    std::cout << "第一个元素: " << arr.front() << std::endl;
    std::cout << "最后一个元素: " << arr.back() << std::endl;
    // 遍历数组
    for (int i = 0; i < arr.size(); ++i) {
        std::cout << arr[i] << ' ';
    }
    std::cout << std::endl;
    // 使用范围-based for 循环
    for (const int& num : arr) {
        std::cout << num << ' ';
    }
    std::cout << std::endl;
    return 0;
}
```
### C++ `vector` 的使用
`vector` 是一个动态数组，其大小可以在运行时改变。`vector` 的使用需要包含 `<vector>` 头文件。
**成员函数**:
- `size()`：返回向量中元素的数量。
- `capacity()`：返回向量当前分配的存储空间大小。
- `empty()`：检查向量是否为空。
- `push_back()`：在向量的末尾添加一个元素。
- `pop_back()`：删除向量的最后一个元素。
- `front()`：返回向量的第一个元素。
- `back()`：返回向量的最后一个元素。
- `data()`：返回指向向量内部数据的指针。
**使用示例**:
```cpp
#include <iostream>
#include <vector>
int main() {
    std::vector<int> vec = {1, 2, 3, 4, 5}; // 创建一个包含5个整数的vector
    // 添加元素
    vec.push_back(6);
    // 访问元素
    std::cout << "第一个元素: " << vec.front() << std::endl;
    std::cout << "最后一个元素: " << vec.back() << std::endl;
    // 遍历向量
    for (int i = 0; i < vec.size(); ++i) {
        std::cout << vec[i] << ' ';
    }
    std::cout << std::endl;
    // 使用范围-based for 循环
    for (const int& num : vec) {
        std::cout << num << ' ';
    }
    std::cout << std::endl;
    // 删除最后一个元素
    vec.pop_back();
    return 0;
}
```
### 替代 C 语言中的数组
- `array` 替代了 C 语言中固定大小的数组。
- `vector` 替代了 C 语言中动态分配的数组，如通过 `malloc` 和 `realloc` 分配的数组。


