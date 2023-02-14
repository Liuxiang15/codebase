class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        '''
        难点：1、数字不重复 2、和为target
        '''
        ans = []
        candidates.sort() # 从小到大排序
        def dfs(curIndex, curList):
            curTotal = sum(curList)
            if curTotal > target:
                return
            if curTotal == target:
                ans.append(curList)
                return
            i = curIndex
            while i < len(candidates):
                dfs(i+1, curList+[candidates[i]])
                # 避免出现重复的方案，所以一直往后找到和当前数字不一样的
                while i+1 < len(candidates) and candidates[i] == candidates[i+1]:
                    i+=1
                i += 1

        dfs(0, [])
        return ans
            