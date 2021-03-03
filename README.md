# vue-model

## Use from Vue application
```
npm install vue-model
```

create MyModel.js
```js
import Model from "Model";

class MyModel extends Model {
  prop1 = String
  prop2 = Boolean
}
```

use in vue component
```vue
<template>
  <input v-model="MyModel.prop1" />
</template>

<script>
import MyModel from 'MyModel.js'

export default {
  data(){
    return {
      MyModel 
    }
  }
}
</script>
```

## Develop setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Run your tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```