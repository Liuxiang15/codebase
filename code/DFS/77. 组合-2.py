class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        r = k
        box = [0 for i in range(r+1)] 
        vis = [False for i in range(n+1)]
        ans = []

        def dfs(step):
            if step > r:
                # print(" ".join([str(i) for i in box[1:r+1]]))
                ans.append(box[1:r+1])
                return 0

            for i in range(box[step-1]+1, n+1):
                if not vis[i]: 
                    box[step] = i
                    vis[i] = True                
                    dfs(step+1)
                    box[step] = 0
                    vis[i] = False

        dfs(1)
        return ans