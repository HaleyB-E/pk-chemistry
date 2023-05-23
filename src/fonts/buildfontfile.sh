if [ -t 1 ]; then
    target="vfs_fonts.js"
else
    target="/dev/stdout"
fi

(
    echo -n "this.pdfMake = this.pdfMake || {}; this.pdfMake.vfs = {"
    for file in "$@"; do
        file=$1
        shift
        echo -n '"'
        echo -n "$(basename $file)"
        echo -n '":"'
        echo -n "$(base64 -w 0 $file)"
        echo -n '"'
        if [ "$#" -gt 0 ]; then
            echo -n ","
        fi
    done
    echo -n "};"
) > "$target"


# $fileName = "File1.txt"
# $fileContent = get-content $fileName
# $fileContentBytes = [System.Text.Encoding]::UTF8.GetBytes($fileContent)
# $fileContentEncoded = [System.Convert]::ToBase64String($fileContentBytes)
# $fileContentEncoded | set-content ($fileName + ".b64")