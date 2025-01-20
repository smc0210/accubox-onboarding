```markdown
# kotlin 퀴즈

## Kotlin 101
### Q1. 코틀린에서 `var`와 `val` 키워드가 의미하는 바는 무엇인가요?
- category: kotlin
- type: multiple
- options:
  - 둘 다 동일하게 변경 불가능한 값을 선언한다
  - 둘 다 동일하게 변경 가능한 값을 선언한다
  - `var`는 변경 가능한 값, `val`은 변경 불가능한 값을 의미한다
  - `val`은 변경 가능한 값, `var`는 변경 불가능한 값을 의미한다
- answer: `var`는 변경 가능한 값, `val`은 변경 불가능한 값을 의미한다
- explanation: 코틀린은 `var` 키워드를 통해 mutable 변수를, `val` 키워드를 통해 immutable 변수를 선언합니다.
- documentUrl: https://accubox.atlassian.net/wiki/spaces/Dev/pages/43090127/Kotlin+101
- documentSection: Basics > a. Property var, val

### Q2. 코틀린의 'Primitive type과 Reference type 구분'에 대한 설명으로 올바른 것은 무엇인가요?
- category: kotlin
- type: multiple
- options:
  - 코틀린은 자바와 동일하게 원시 타입과 참조 타입을 엄격히 구분한다
  - 코틀린은 모든 타입을 내부적으로 primitive로만 취급한다
  - 코틀린은 코드 상에서 Reference type만 보이지만, 런타임 시 필요한 경우 primitive로 최적화한다
  - 코틀린은 boxing, unboxing을 명시적으로 호출해야 한다
- answer: 코틀린은 코드 상에서 Reference type만 보이지만, 런타임 시 필요한 경우 primitive로 최적화한다
- explanation: 코틀린은 소스 코드 차원에서는 Reference type처럼 보이지만, 컴파일러가 자동으로 primitive 변환을 처리하므로 boxing/unboxing을 직접 고려할 필요가 없습니다.
- documentUrl: https://accubox.atlassian.net/wiki/spaces/Dev/pages/43090127/Kotlin+101
- documentSection: Basics > b. Type

### Q3. 아래 중 코틀린에서 함수의 반환 타입이 없는 경우(자바의 void에 해당)로 사용되는 타입은 무엇인가요?
- category: kotlin
- type: multiple
- options:
  - Any
  - Unit
  - Nothing
  - Null
- answer: Unit
- explanation: 코틀린의 `Unit`은 자바의 `void`와 유사하지만, 실제로는 단 하나의 인스턴스가 존재하는 타입이므로 제네릭이나 고차 함수 등에서 타입으로 사용될 수 있습니다.
- documentUrl: https://accubox.atlassian.net/wiki/spaces/Dev/pages/43090127/Kotlin+101
- documentSection: Basics > b. Type

### Q4. 코틀린의 `Nothing` 타입에 대한 설명으로 가장 적절한 것은 무엇인가요?
- category: kotlin
- type: multiple
- options:
  - 모든 코틀린 클래스의 최상위 타입이다
  - 널을 표현하기 위한 특별한 타입이다
  - 인스턴스를 절대 가질 수 없는 타입이며, 주로 항상 예외를 던지는 함수의 반환 타입으로 사용된다
  - 자바의 `Object`와 동일하다
- answer: 인스턴스를 절대 가질 수 없는 타입이며, 주로 항상 예외를 던지는 함수의 반환 타입으로 사용된다
- explanation: `Nothing`은 “절대 값을 반환하지 않음”을 의미하며, 무한 루프나 예외만 던지는 함수에서 사용됩니다.
- documentUrl: https://accubox.atlassian.net/wiki/spaces/Dev/pages/43090127/Kotlin+101
- documentSection: Basics > b. Type

### Q5. 코틀린의 Null Safety 개념 중 `?.` 연산자의 기능은 무엇인가요?
- category: kotlin
- type: multiple
- options:
  - 항상 NullPointerException을 발생시킨다
  - 변수가 null이 아닌 경우에만 안전하게 접근하고, null이면 접근을 무시한다
  - 변수를 강제로 null이 아닌 타입으로 캐스팅한다
  - null 값을 대체할 기본값을 반환한다
- answer: 변수가 null이 아닌 경우에만 안전하게 접근하고, null이면 접근을 무시한다
- explanation: `?.` 연산자는 안전 호출(Safe Call) 연산자로, null일 때는 호출을 생략하여 NPE를 방지합니다.
- documentUrl: https://accubox.atlassian.net/wiki/spaces/Dev/pages/43090127/Kotlin+101
- documentSection: Basics > c. Null

### Q6. 코틀린에서 `!!` 연산자를 사용했을 때 발생할 수 있는 결과는 무엇인가요?
- category: kotlin
- type: multiple
- options:
  - null이 들어와도 안전하게 처리된다
  - null을 허용하지 않는 타입을 nullable 타입으로 변경한다
  - 변수가 실제로 null이면 `NullPointerException`을 발생시킨다
  - 변수 값을 문자열로 변환한다
- answer: 변수가 실제로 null이면 `NullPointerException`을 발생시킨다
- explanation: `!!`는 “null이 절대 아니다”라고 컴파일러에 알리는 연산자로, 만약 실제 값이 null이면 런타임에 예외를 발생시킵니다.
- documentUrl: https://accubox.atlassian.net/wiki/spaces/Dev/pages/43090127/Kotlin+101
- documentSection: Basics > c. Null

### Q7. 코틀린에서 `==`와 `===` 연산자의 차이로 올바른 것은 무엇인가요?
- category: kotlin
- type: multiple
- options:
  - `==`는 참조 동일성 비교, `===`는 값(구조) 동일성 비교
  - 둘 다 무조건 참조 동일성만 비교
  - `==`는 자바의 equals()를 호출하는 구조적 동등성, `===`는 객체 참조(동일 인스턴스) 동등성
  - 둘 다 자바의 equals()를 호출하여 값 동등성을 비교
- answer: `==`는 자바의 equals()를 호출하는 구조적 동등성, `===`는 객체 참조(동일 인스턴스) 동등성
- explanation: 코틀린에서 `==`는 구조적 동등성을, `===`는 참조(메모리) 동등성을 확인합니다.
- documentUrl: https://accubox.atlassian.net/wiki/spaces/Dev/pages/43090127/Kotlin+101
- documentSection: Basics > d. Operator

### Q8. 코틀린에서 `in` 연산자는 주로 어떤 용도로 사용되나요?
- category: kotlin
- type: multiple
- options:
  - 명시적으로 boxing을 수행하기 위해 사용한다
  - 널 체크를 수행하기 위한 연산자다
  - 범위(range) 또는 컬렉션 내에 요소가 존재하는지 검사하기 위해 사용한다
  - 문자열 변수를 정수로 변환하기 위해 사용한다
- answer: 범위(range) 또는 컬렉션 내에 요소가 존재하는지 검사하기 위해 사용한다
- explanation: `in`은 “값이 특정 범위나 컬렉션 안에 있는지”를 확인할 때 사용됩니다.
- documentUrl: https://accubox.atlassian.net/wiki/spaces/Dev/pages/43090127/Kotlin+101
- documentSection: Basics > d. Operator

### Q9. 코틀린에서 `..` 연산자의 역할로 적절한 것은 무엇인가요?
- category: kotlin
- type: multiple
- options:
  - 파일 시스템 경로를 결합한다
  - 두 수 사이의 범위를 생성한다
  - 조건문을 중첩해서 실행한다
  - 람다 함수를 선언한다
- answer: 두 수 사이의 범위를 생성한다
- explanation: `a..b`는 `a`부터 `b`까지의 범위를 표현하는 코틀린의 범위 연산자입니다.
- documentUrl: https://accubox.atlassian.net/wiki/spaces/Dev/pages/43090127/Kotlin+101
- documentSection: Basics > d. Operator

### Q10. 코틀린에서 `Elvis` 연산자(`?:`)를 활용해 함수를 간단히 종료할 수 있는 방식으로 옳은 것은 무엇인가요?
- category: kotlin
- type: multiple
- options:
  - `?: throw Exception("에러")`
  - `?: break`
  - `?: continue`
  - `?: ifNull`
- answer: `?: throw Exception("에러")`
- explanation: Elvis 연산자는 좌측 값이 null일 때 우측 구문을 실행할 수 있으며, 흔히 `?: return` 또는 `?: throw Exception("...")` 형태로 사용합니다.
- documentUrl: https://accubox.atlassian.net/wiki/spaces/Dev/pages/43090127/Kotlin+101
- documentSection: Basics > c. Null
```