---
layout: post
title:  "Golang Closure Exercise"
date:   2019-05-25 15:00:00 +0800
categories: golang programming
---
I always had a question, if Golang does not have
[static variable](https://en.wikipedia.org/wiki/Static_variable), how could it
gracefully handle long lifetime variables except using global variables?

Until last night, I saw this
[Exercise: Fibonacci closure](https://tour.golang.org/moretypes/26) in
[A tour of Go](https://tour.golang.org/list). I have to admit I am not a fun of
closure, sometimes it makes easy logic complex. But it is still great for
learning.

> **Exercise: Fibonacci closure**
>
> Let's have some fun with functions.
>
> Implement a fibonacci function that returns a function (a closure) that
> returns successive fibonacci numbers (0, 1, 1, 2, 3, 5, ...).

```golang
package main

import "fmt"

// fibonacci is a function that returns
// a function that returns an int.
func fibonacci() func() int {
	first, second := 1, 0
	return func() int {
		first, second = second, first + second
		return first
	}
}

func main() {
	f := fibonacci()
	for i := 0; i < 10; i++ {
		fmt.Println(f())
	}
}
```

Usually, it is easy to choose the initial values of `first` and `second`, if the
sequence starts from `1`. What if the sequence starts from `0`, why `1` and `0`?

Let's take a close look at
[Fibonacci](https://en.wikipedia.org/wiki/Fibonacci_number) sequence

$$
{F_{0}=0,\quad F_{1}=1,} \\
and \\
{F_{n}=F_{n-1}+F_{n-2}} \\
for\quad {n > 1}.
$$

Base on the formula, it could also be extended to negative index

| F<sub>−4</sub> | F<sub>−3</sub> | F<sub>−2</sub> | F<sub>−1</sub> | F<sub>0 </sub> | F<sub>1 </sub> | F<sub>2 </sub> | F<sub>3 </sub> | F<sub>4 </sub> | F<sub>5 </sub> | F<sub>6 </sub> | F<sub>7 </sub> | F<sub>8 |
| -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- | ------- |
| −3             | 2              | −1             | 1              | 0              | 1              | 1              | 2              | 3              | 5              | 8              | 13             | 21      |

A typical C++ implementation would not need closure, it can be implemented by
static variables. It is much more straightforward, although it does not have the
ability to leverage the multiple return values like
`first, second = second, first + second` in Golang.

```c++
#include <iostream>

int fibonacci()
{
    static int first = 1, second = 0;
    second = first + second;
    first = second - first;
    return first;
}

int main()
{
    for (int i = 0; i < 10; i++)
    {
        std::cout << fibonacci() << std::endl;
    }
}
```