const schemaJson = require("./src/graphql/schema.json");

module.exports = {
  extends: ["airbnb", "plugin:prettier/recommended"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      impliedStrict: true,
      classes: true,
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    "arrow-body-style": [2, "as-needed"],
    "no-console": 0,
    "linebreak-style": 0,
    "no-use-before-define": 0,
    "import/no-extraneous-dependencies": 0,
    "react/no-danger": 0,
    "import/prefer-default-export": 0,
    import: 0,
    "func-names": 0,
    "space-before-function-paren": 0,
    "import/extensions": 0,
    "no-underscore-dangle": 0,
    "consistent-return": 0,
    "react/display-name": 0,
    "react/react-in-jsx-scope": 0,
    "react/forbid-prop-types": 0,
    "react/prop-types": 0,
    "react/no-unescaped-entities": 0,
    "jsx-a11y/accessible-emoji": 0,
    "prettier/prettier": "error",
    "jsx-a11y/href-no-hash": "off",
    "react/prefer-stateless-function": 0,
    "jsx-a11y/label-has-for": 0,
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx"],
      },
    ],
    "jsx-a11y/anchor-is-valid": [
      "warn",
      {
        aspects: ["invalidHref"],
      },
    ],
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        controlComponents: ["Field"],
        depth: 3,
      },
    ],
    "react/no-multi-comp": 0,
    "react-hooks/rules-of-hooks": "error",
    "jsx-a11y/img-redundant-alt": 0,
    "react/jsx-props-no-spreading": 0,
    "no-nested-ternary": "warn",
    "graphql/template-strings": [
      "error",
      {
        // Import default settings for your GraphQL client. Supported values:
        // 'apollo', 'relay', 'lokka', 'fraql', 'literal'
        env: "literal",

        // Import your schema JSON here
        schemaJson,

        // OR provide absolute path to your schema JSON (but not if using `eslint --cache`!)
        // schemaJsonFilepath: path.resolve(__dirname, './schema.json'),

        // OR provide the schema in the Schema Language format
        // schemaString: printSchema(schema),

        // tagName is gql by default
      },
    ],
    "import/no-cycle": 0,
  },
  globals: {
    tw: true,
    FB: true,
  },
  plugins: ["graphql", "@emotion", "react-hooks"],
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@Components", "./src/components"],
          ["@Data", "./src/data"],
          ["@Utils", "./src/utils"],
          ["@Libs", "./src/libs"],
          ["@Graphql", "./src/graphql"],
          ["@Blocks", "./src/blocks"],
          ["@Mock", "./src/mock"],
        ],
        extensions: [".ts", ".js", ".jsx", ".json"],
      },
    },
  },
};
