---
type: docs
title: 字符串string
linkTitle: 字符串string
nav_weight: 4
authors:
  - YYF
date: 2024-03-06T01:20:01+08:00
---


<!--more-->
C++中的`std::string`是一个非常有用的类，它提供了对字符串的丰富操作。在这篇博客中，我们将详细介绍`std::string`的用法，包括它的常用函数和用法。
## 1. 定义和初始化
`std::string`是C++标准库中的一个类，用于表示和处理字符串。你可以使用以下方式来定义和初始化一个`std::string`对象：
```cpp
#include <iostream>
#include <string>
int main() {
    std::string str1; // 默认构造函数，创建一个空字符串
    std::string str2 = "Hello World"; // 使用字符串字面量初始化
    std::string str3(5, 'a'); // 创建一个包含5个'a'的字符串
    return 0;
}
```
## 2. 常用函数
### 2.1 添加和连接字符串
```cpp
std::string str1 = "Hello";
std::string str2 = "World";
std::string str3 = str1 + " " + str2; // "Hello World"
str1 += str2; // "HelloWorld"
```
### 2.2 访问和修改字符串
```cpp
std::string str = "Hello World";
char ch = str[0]; // 获取第一个字符 'H'
str[0] = 'h'; // 修改第一个字符为 'h'
```
### 2.3 查找子字符串
```cpp
std::string str = "Hello World";
size_t pos = str.find("World"); // 查找子字符串 "World"，返回其在str中的位置
if (pos != std::string::npos) {
    std::cout << "Found at position: " << pos << std::endl;
}
```
### 2.4 插入和删除字符
```cpp
std::string str = "Hello World";
str.insert(5, " C++"); // 在位置5插入字符串 " C++"，结果为 "Hello C++ World"
str.erase(5, 3); // 从位置5开始删除3个字符，结果为 "Hello World"
```
### 2.5 子字符串
```cpp
std::string str = "Hello World";
std::string substr = str.substr(6, 5); // 获取从位置6开始的5个字符，结果为 "World"
```
### 2.6 大小写转换
```cpp
std::string str = "Hello World";
str.erase(0, 5); // 删除前5个字符，结果为 "World"
```
### 2.7 删除和替换字符
```cpp
std::string str = "Hello World";
str.erase(5, 3); // 从位置5开始删除3个字符，结果为 "Hello World"
str.replace(5, 5, "C++"); // 从位置5开始替换5个字符为 "C++"，结果为 "Hello C++"
```
### 2.8 字符串长度
```cpp
std::string str = "Hello World";
size_t length = str.size();   // 获取字符串长度
size_t length = str.length(); // 获取字符串长度
```
## 3. 迭代器
`std::string`提供了迭代器，你可以使用它们来遍历字符串中的每个字符：
```cpp
std::string str = "Hello World";
for (std::string::iterator it = str.begin(); it != str.end(); ++it) {
    std::cout << *it; // 输出字符串中的每个字符
}
```
## 4. 输入和输出
你可以使用`std::cin`和`std::cout`来输入和输出`std::string`对象：
```cpp
std::string str;
std::cout << "Enter a string: ";
std::cin >> str; // 输入字符串
std::cout << "You entered: " << str << std::endl; // 输出字符串
```
请注意，`std::cin >> str`只会读取一个单词，直到遇到空白符。如果你想要读取整行，可以使用`std::getline()`：
```cpp
std::string line;
std::getline(std::cin, line); // 读取整行
std::cout << "Read line: " << line << std::endl;
```

`std::getline()` 函数可以有第三个参数，这个参数用于指定分隔符。默认情况下，`std::getline()` 使用换行符（`\n`）作为分隔符，但是可以通过第三个参数来改变这个行为。
`std::getline()` 函数的第三个参数是一个字符，它指定了在读取过程中作为行结束标志的字符。当你指定了这个字符作为分隔符时，`std::getline()` 会读取输入流，直到遇到这个字符或者到达文件结束（EOF）。这个分隔符字符本身不会被读取或者存储在结果字符串中。
下面是一个使用第三个参数的例子：
```cpp
#include <iostream>
#include <string>
int main() {
    std::string line;
    std::getline(std::cin, line, '$');  // 使用 '$' 作为分隔符
    std::cout << "Read line: " << line << std::endl;
    return 0;
}
```
在这个例子中，`std::getline()` 会读取输入流，直到遇到字符`'$'`或者换行符。如果输入流中包含`'$'`，它将不会被包含在`line`字符串中，而是作为分隔符，导致`std::getline()`停止读取。
请注意，如果你使用`std::getline()`来读取文件，并且指定了一个字符作为分隔符，那么这个字符必须在文件结束之前出现，否则`std::getline()`将会读取直到文件结束，这可能会导致内存问题，因为它会尝试读取整个文件到内存中的字符串。

## 5. 总结
`std::string`是C++中处理字符串的强大工具。它提供了丰富的函数和操作，使字符串处理变得简单和直观。通过掌握`std::string`的用法，你可以更有效地处理文本数据。
