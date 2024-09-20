# NextJs 주요 함수 설명

작성한 사람: 이진희
CreatedAt: 9월 18, 2024

Next.js에서 데이터를 가져오는 주요 함수로는 **`getStaticProps`**, **`getServerSideProps`** 외에도 **`getStaticPaths`**가 있습니다. 각각의 역할을 설명하면 다음과 같습니다:

### 1. **`getStaticProps`**

- **역할**: 정적 사이트 생성(Static Site Generation, SSG)에서 사용됩니다. 페이지 빌드 시점에 데이터를 미리 가져와서 정적 페이지를 생성합니다.
- **사용 상황**: 데이터가 자주 변경되지 않고, 미리 페이지를 생성해도 되는 경우에 사용합니다. 예를 들어, 블로그 포스트나 제품 목록 페이지 등이 해당됩니다.
- **장점**: 페이지 로딩 속도가 매우 빠르고, SEO에 유리합니다.

```jsx
export async function getStaticProps() {
  const res = await fetch('<https://api.example.com/data>');
  const data = await res.json();

  return {
    props: { data }, // 페이지 컴포넌트에 props로 전달
  };
}

```

### 2. **`getServerSideProps`**

- **역할**: 서버 측 렌더링(Server-Side Rendering, SSR)에서 사용됩니다. 매 요청 시마다 서버에서 데이터를 가져와 페이지를 렌더링합니다.
- **사용 상황**: 데이터가 자주 변경되거나, 사용자마다 다른 데이터를 보여줘야 할 때 유용합니다. 예를 들어, 로그인된 사용자마다 다른 대시보드를 보여줘야 하는 경우입니다.
- **장점**: 매 요청마다 최신 데이터를 가져올 수 있으며, 유저별로 동적인 데이터를 렌더링할 수 있습니다.

```jsx
export async function getServerSideProps(context) {
  const res = await fetch('<https://api.example.com/data>');
  const data = await res.json();

  return {
    props: { data }, // 페이지 컴포넌트에 props로 전달
  };
}

```

### 3. **`getStaticPaths`**

- **역할**: 동적 경로가 있는 정적 페이지를 생성할 때, 어떤 경로를 미리 생성할지 지정합니다. **`getStaticProps`*와 함께 사용되며, 여러 경로를 미리 정적으로 생성할 수 있습니다.
- **사용 상황**: 동적 라우팅이 필요한 페이지에서, 예를 들어 블로그 포스트의 ID별로 각 페이지를 생성하는 경우입니다.
- **장점**: 미리 생성한 경로로 빠르게 접근할 수 있어 성능이 우수하며, SEO에 좋습니다.

```jsx
export async function getStaticPaths() {
  const res = await fetch('<https://api.example.com/posts>');
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  return {
    paths,
    fallback: false, // fallback 옵션으로 미리 생성되지 않은 경로 처리 가능
  };
}

```

### 요약

- **`getStaticProps`**: 빌드 시 정적 페이지를 생성하는 데 사용.
- **`getServerSideProps`**: 요청 시마다 서버에서 데이터를 가져와 동적으로 페이지를 생성.
- **`getStaticPaths`**: 정적 페이지를 동적 경로로 생성할 때 경로를 정의.

이 함수들은 Next.js의 데이터 페칭 메커니즘으로, 다양한 상황에 맞게 페이지를 미리 생성하거나 동적으로 렌더링하는 데 사용됩니다.