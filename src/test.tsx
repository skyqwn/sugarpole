// 예제: lint-staged 및 husky 테스트용 TypeScript 코드

const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function sum(nums: number[]): { total: number; average: number } {
  let total = 0;
  for (let i = 0; i < nums.length; i++) {
    total += nums[i];
  }
  const average = total / nums.length;
  return { total, average };
}

const result = sum(numbers);

console.log('총합: ', result.total, '평균:', result.average);

class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(
      `안녕하세요, 제 이름은 ${this.name}이고, 나이는 ${this.age}살입니다.`
    );
  }
}

const user = new Person('철수', 25);
user.greet();

export { sum, Person };
