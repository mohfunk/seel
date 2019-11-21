const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const sh = require("shelljs");

let mainConfig = {
    mode: "development",
    entry: "./public/main.ts",
    target: "node",
    output: {
        filename: "main.bundle.js",
        path: __dirname + "/dist",
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    resolve: {
        extensions: [".js", ".json", ".ts"],
    },
    module: {
        rules: [
            {
                // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
                test: /\.(ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                },
            },
            {
                test: /\.(svg)$/,
                loader: "file-loader",
                options: {
                    name: "./img/icons/[name].[ext]",
                    publicPath: "../",
                },
            },
            {
                // Match woff2 and patterns like .woff?v=1.1.1.
                test: /\.(woff)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 50000,
                        mimetype: "application/font-woff",
                        name: "./fonts/[name].[ext]", // Output below ./fonts
                        publicPath: "../", // Take the directory into account
                    },
                },
            },
        ],
    },
};

let rendererConfig = {
    mode: "development",
    entry: "./src/sketch.ts",
    target: "web",
    output: {
        filename: "renderer.bundle.js",
        path: __dirname + "/dist",
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    resolve: {
        extensions: [".js", ".json", ".ts", ".tsx"],
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                },
            },
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    "style-loader",
                    "css-loader?sourceMap",
                    "sass-loader?sourceMap",
                ],
            },
            {
                test: /\.(jpg|png|svg|ico|icns)$/,
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]",
                },
            },
            {
                test: /\.mp3$/,
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]",
                },
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]",
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./public/index.html"),
        }),
        function() {
            this.plugin("done", () => {
                sh.cp(
                    "-rf",
                    `${__dirname}/public/AudioFiles`,
                    `${__dirname}/dist/`
                );
            });
        },
    ],
};

module.exports = [mainConfig, rendererConfig];
