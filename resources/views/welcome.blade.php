<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>I-Hotel</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

    <!-- Styles -->
    @viteReactRefresh
    @vite(['resources/js/app.js', 'resources/css/app.css', 'resources/sass/app.scss'])
</head>

<body>

    <div id="app"></div>

    <!-- This line is used to include the React app file -->
</body>

</html>
