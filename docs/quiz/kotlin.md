# Kotlin 퀴즈

## Kotlin 기초

### Q1. Kotlin에서 변수 선언시 var와 val의 차이점은 무엇인가요?

- category: kotlin
- type: multiple
- options:
  - var는 primitive type, val는 reference type
  - var는 mutable, val는 immutable
  - var는 지역변수, val는 전역변수
  - var는 컴파일타임 상수, val는 런타임 상수
- answer: var는 mutable, val는 immutable
- explanation: Kotlin에서 var는 Variable의 약자로 mutable(변경 가능)하고, val은 Value의 약자로 immutable(변경 불가능)합니다.
- documentUrl: https://accubox.atlassian.net/l/cp/WNemjV0m
- documentSection: Kotlin Basics

### Q2. Kotlin의 Any 타입에 대한 설명으로 올바른 것은?

- category: kotlin
- type: multiple
- options:
  - Java의 void와 동일하다
  - Kotlin의 최상위 클래스이다
  - Primitive 타입에만 사용할 수 있다
  - null을 포함할 수 있다
- answer: Kotlin의 최상위 클래스이다
- explanation: Any는 Kotlin 클래스 계층 구조의 최상위 클래스로, Java의 Object와 유사한 역할을 합니다. Any 자체는 null을 포함할 수 없으며, nullable은 Any?로 표현해야 합니다.
- documentUrl: https://accubox.atlassian.net/l/cp/WNemjV0m
- documentSection: Kotlin Type System

### Q3. Kotlin의 Null Safety 기능 중 '?.' 연산자의 역할은 무엇인가요?

- category: kotlin
- type: multiple
- options:
  - null인 경우에만 메서드를 호출한다
  - null이 아닌 경우에만 메서드를 호출한다
  - 항상 null을 반환한다
  - null 체크 없이 강제로 메서드를 호출한다
- answer: null이 아닌 경우에만 메서드를 호출한다
- explanation: Kotlin의 Safe Call 연산자 '?.'는 객체가 null이 아닌 경우에만 메서드를 호출하고, null인 경우 null을 반환합니다. 이는 NPE(NullPointerException)를 방지하는 안전한 방법입니다.
- documentUrl: https://accubox.atlassian.net/l/cp/WNemjV0m
- documentSection: Kotlin Null Safety 