const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const sh = require("shelljs");


let rendererConfig = {
    mode: "development",
    entry: "./public/index.tsx",
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
        rules: [{
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
        function () {
            this.plugin("done", () => {
                sh.cp(
                    "-rf",
                    `${__dirname}/public/AudioFiles`,
                    `${__dirname}/dist/`
                );
                sh.cp(
                    "-rf",
                    `${__dirname}/public/assets`,
                    `${__dirname}/dist/`
                )
            });
        },
    ],
};

module.exports = [rendererConfig];