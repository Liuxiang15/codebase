题目模板：https://code.xueersi.com/live/creator/1?template_project_id=40680701&work_type=xes_classwork 
【难度星级】8星 ⭐⭐⭐⭐⭐⭐⭐⭐
使用火柴表示 0 到9 的方法如下：
 ——             ——      ——              ——      ——      ——      ——      ——
|  |     |        |       |    |  |    |       |          |    |  |    |  |
                ——      ——      ——      ——      ——              ——      ——
|  |     |     |          |       |       |    |  |       |    |  |       |
 ——             ——      ——              ——      ——              ——      ——

妈妈计划用火柴帮小鱼认识数字，不过由于火柴数量有限，有些数字没办法摆放出来，例如火柴数量m=10时,此时可以摆放出数字0、1、2...... 不过没办法摆放出数字88、89、90等。妈妈计划今天帮小鱼认识r个数字，先摆放出第1个数字之后，火柴可以回收然后重新摆放第2个数字，统计可以摆放出来k个数字的不同的组合数量
任意输入两个正整数m(m<8)和 r(r<6), 分别表示火柴盒里面的火柴数量以及今天要学习的数字数量，输出可以摆放的数字组合数量
例如：m=4,r=2。此时用4根火柴可以摆放出的数字有1、4、7、11，此时妈妈可以先摆放数字7，回收所有火柴后可以再摆放数字11。
因此不同的学习组合是：1和4、1和7、1和11、4和7、4和11、7和11一共6种 

【输入样例】
42
【输出样例】
6


```python
m, r = [int(i) for i in input().split(" ")]
lst =[6,2,5,5,4,5,6,3,7,6]
res = []
for i in range(1111):
    num = 0
    for j in str(i):
        num += lst[int(j)]
    if num <= m:
        res.append(i)
n = len(res)
box = [0 for i in range(r+1)]
vis = [False for i in range(n+1)]
num = 0
def dfs(step):
    global num
    if step > r:
        num += 1
        return 0
    for i in range(box[step-1]+1, n+1):
        if not vis[i]:
            box[step] = i
            vis[i] = True
            dfs(step+1)
            box[step] = 0
            vis[i] = False
dfs(1)
print(num)
```