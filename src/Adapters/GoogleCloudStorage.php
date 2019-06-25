<?php

/*
 * This file is part of flagrow/upload.
 *
 * Copyright (c) Flagrow.
 *
 * http://flagrow.github.io
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

namespace Flagrow\Upload\Adapters;

use Flagrow\Upload\Contracts\UploadAdapter;
use Flagrow\Upload\File;
use Flagrow\Upload\Helpers\Settings;
use Illuminate\Support\Arr;

class GoogleCloudStorage extends Flysystem implements UploadAdapter
{
    /**
     * @param File $file
     */
    protected function generateUrl(File $file)
    {
        /** @var Settings $settings */
        $settings = app()->make(Settings::class);
       
        if ($cdnUrl = $settings->get('cdnUrl')) {
            $file->url = sprintf('%s/%s', $cdnUrl, $file->url);
        } else {
            $bucket = $settings->get('googleCloudStorageBucket');
            $baseUrl = sprintf('https://storage-download.googleapis.com/%s/', $bucket);

            $file->url = sprintf(
                $baseUrl.'%s',
                Arr::get($this->meta, 'path', $file->path)
            );
        } 
        
    }
}
