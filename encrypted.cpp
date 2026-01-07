class Solution {
public:
    int sumOfEncryptedInt(vector<int>& nums) {
        int sum = 0;

        for (int i = 0; i < nums.size(); i++) {
            int temp = nums[i];
            int maxDigit = 0;
            int digits = 0;

            while (temp > 0) {
                maxDigit = max(maxDigit, temp % 10);
                temp /= 10;
                digits++;
            }

            int encrypted = 0;
            for (int j = 0; j < digits; j++) {
                encrypted = encrypted * 10 + maxDigit;
            }

            sum += encrypted;
        }

        return sum;
    }
};
