var DataStrata = require('@datastrata/aws-s3-encryption-layer');
var fs = require('fs');

const main = async () => {
    try {
        const testFileName = 'test-file.txt';

        var fileStream = fs.createReadStream(testFileName);
        fileStream.on('error', function(err) {
            console.log('File Error', err);
        });

        const encryptionLayer = new DataStrata.EncryptionLayer(
            'YOUR-REST-CREDENTIAL-CLIENT-ID',
            'YOUR-REST-CREDENTIAL-SECRET',
            'us-east-1');

        const uploadResult = await encryptionLayer.putObject(    {
            Bucket: 'datastrata-tutorial-bucket',
            Key: 'test-file-encrypted-js.txt',
            Body: fileStream
        });

        const downloadResult = await encryptionLayer.getObject(    {
            Bucket: 'datastrata-tutorial-bucket',
            Key: 'test-file-encrypted-js.txt'
        });

        console.log('Your file after the round-trip:');
        console.log(downloadResult.Body.toString());

        const deleteResult = await encryptionLayer.deleteObject(    {
            Bucket: 'datastrata-tutorial-bucket',
            Key: 'test-file-encrypted-js.txt'
        });

    } catch (e) {
        console.log(e);
    }
}

main();
