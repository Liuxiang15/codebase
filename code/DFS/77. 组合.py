class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        ans = []
        nums = [int(i) for i in range(1, n+1)]
        def dfs(curIndex, curList):
            if len(curList) == k:
                ans.append(curList)
                return
            for i in range(curIndex, len(nums)):
                dfs(i+1, curList+[nums[i]])
            return ans

        dfs(0, [])
        return ans